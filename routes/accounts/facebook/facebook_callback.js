const path = require("path");
const dateUtil = require('date-fns');
var request_url = require('request');
const db = require("../../../models");

const functions = require("../../../utility/function.js")
const USER = db.user;
const Accounts = db.accounts;

module.exports = function (app) {
    let endpoint_directory = path.basename(path.dirname(__dirname));
    let endpoint_category = path.basename(path.dirname(__filename));

    app.get(`/${endpoint_directory}/${endpoint_category}/facebook_callback`, async (request, response, next) => {
        try {

            const REDIRECT_URL = `${process.env.FACEBOOK_CALLBACK_URL}`;
        
            let payload = {
                is_verified: false,
                is_blocked: false,
                is_registered: false
            }

            let token = request.query.state
            let userExists = await USER.find({ token: token})
            let accountsExists = await Accounts.find({ token: token})
            
            
            if (!functions.empty(userExists)) {
                        
                try {

                    userExists = Array.isArray(userExists)? userExists[0] : userExists;
                    accountsExists = Array.isArray(accountsExists)? accountsExists[0] : accountsExists;

                    // Check if token has expired
                    const difference = Math.abs(dateUtil.differenceInMinutes(new Date(userExists.token_expiry), new Date()))
                    if (difference > process.env.TOKEN_EXPIRY_MINUTES) {
                        payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                        payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                        payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                        throw new Error("This user authentication token has expired, login again retry.")
                    }


                 try{
                     
                    let url = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${request.query.code}`;

                        let auth_req =  request_url(url, async (err, res, body) => {
                       
                        let access_token = JSON.parse(body).access_token;

                        if(!functions.empty(access_token) ){
        
                        //exchange access token for a long-lived token that can be used to access the API for a period of time
                        let url = `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${access_token}`;
        
                        let long_lived_token_req = request_url(url, async (err, res, body) => {
                        let long_lived_token = JSON.parse(body).access_token;
        
                        //get user profile
                        let url = `https://graph.facebook.com/v12.0/me?access_token=${long_lived_token}&fields=id,name,email,picture`;
        
                        let user_profile_response =  request_url(url, async (err, res, body) => {
                                let user_profile_body = JSON.parse(body)
                                let user_profile_name = user_profile_body.name
                                let user_profile_picture = user_profile_body.picture.data.url
            
                                if(functions.empty(body)){ throw new Error("Facebook profile not found")}
        
                                

                                if (functions.empty(accountsExists)) {
                                    try {
        
                                        // SAVE CREDENTIALS
                                        await Accounts.create({
                                            token: token,
                                            accounts: [
                                                {
                                                    name: "facebook",
                                                    access_token: long_lived_token,
                                                    refresh_token: "",
                                                    user_name: user_profile_name,
                                                    user_picture: user_profile_picture,
                                                    is_connected: true,
                                                }
                                            ]
                                        })
        
                                    } catch (error) {
                                        if(error){ throw new Error(error) }
                                    }
        
                                }else{
                                    accountsExists = await Accounts.find({ token: token, "accounts.name": "facebook"})
                                    accountsExists = Array.isArray(accountsExists)? accountsExists[0] : accountsExists;
                                    
                                    if (functions.empty(accountsExists)) {
        
                                        try {
        
                                            // SAVE CREDENTIALS
        
                                            await Accounts.updateOne(
                                                { "token": token },
                                                { "$push": { 
                                                        "accounts": {
                                                            "name": "facebook",
                                                            "access_token": long_lived_token,
                                                            "refresh_token": "",
                                                            "user_name": user_profile_name,
                                                            "user_picture": user_profile_picture,
                                                            "is_connected": true
                                                        } 
                                                    } 
                                                }
                                            )
        
                                        } catch (error) {
                                            if(error){ throw new Error(error) }
                                        }
        
                                    }else{
                                        await Accounts.updateOne(
                                            { "token": token, "accounts.name": "facebook" },
                                            { "$set": { 
                                                    "accounts.$.access_token": long_lived_token,
                                                    "accounts.$.refresh_token": "",
                                                    "accounts.$.user_name": user_profile_name,
                                                    "accounts.$.user_picture": user_profile_picture,
                                                    "accounts.$.is_connected": true
                                                } 
                                            }
                                        )
                                    }
        
                                }
                                            
                            })
        
                        });

                    } else {
                        response.status(400).json({ "status": 400, "message": "Access token missing or expired, check and retry.", "data": payload });
                    }
             
                    });
                 }catch(err){
                    response.status(400).json({ "status": 400, "message": "Access token missing or expired, check and retry.", "data": payload });
                 }

                    payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                    payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                    payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)

                    response.redirect('https://livesnapp.co/accounts')

                } catch (e) {
                    response.status(400).json({ "status": 400, "message": e.message, "data": payload });
                }

            } else {
                response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
            }    

        } catch (error) {
            response.status(400).json({ "status": 400, "message": error.message, "data": null });
        }
    })

}










