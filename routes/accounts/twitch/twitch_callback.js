const path = require("path");
const dateUtil = require('date-fns');
var request_url = require('request');
const db = require("../../../models");
const axios = require('axios');

const functions = require("../../../utility/function.js")
const USER = db.user;
const Accounts = db.accounts;

module.exports = function (app) {
    let endpoint_directory = path.basename(path.dirname(__dirname));
    let endpoint_category = path.basename(path.dirname(__filename));

    app.get(`/${endpoint_directory}/${endpoint_category}/twitch_callback`, async (request, response, next) => {
        try {

            const REDIRECT_URL = `${process.env.TWITCH_CALLBACK_URL}`;
        
            let payload = {
                is_verified: false,
                is_blocked: false,
                is_registered: false
            }

            let token = request.query.state;
            let userExists = await USER.find({ token: token });
            let accountsExists = await Accounts.find({ token: token})

            if (!functions.empty(userExists)) {

                try {
            
                    userExists = Array.isArray(userExists) ? userExists[0] : userExists;
                    accountsExists = Array.isArray(accountsExists)? accountsExists[0] : accountsExists;
            
                    // Check if token has expired
                    const difference = Math.abs(dateUtil.differenceInMinutes(new Date(userExists.token_expiry), new Date()));
                    if (difference > process.env.TOKEN_EXPIRY_MINUTES) {
                        payload["is_verified"] = functions.stringToBoolean(userExists.is_verified);
                        payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked);
                        payload["is_registered"] = functions.stringToBoolean(userExists.is_registered);
                        throw new Error("This user authentication token has expired, login again retry.");
                    }


                    try{

                        const exchange_token_url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${request.query.code}&grant_type=authorization_code&redirect_uri=${REDIRECT_URL}`;

                        const exchange_token_response = await axios.post(exchange_token_url);
            
                        const access_token = exchange_token_response.data.access_token;
                        const refresh_token = exchange_token_response.data.refresh_token;
            
                        //get the user profile from twitch
                        const user_profile_response = await axios.get(`https://api.twitch.tv/helix/users`, {
                            headers: {
                                'Client-ID': process.env.TWITCH_CLIENT_ID,
                                'Authorization': `Bearer ${access_token}`
                            }
                        });
            
                        const user_profile_body = user_profile_response.data.data[0];
            
                        const user_profile_name = user_profile_body.display_name;
            
                        const user_profile_picture = user_profile_body.profile_image_url;
            
                        const user_profile_id = user_profile_body.id;
            
                        
                        if (functions.empty(exchange_token_response.data)) { throw new Error("Access token and refresh token data are missing."); }
            
                        if (!functions.empty(exchange_token_response.data.access_token || !functions.empty(exchange_token_response.data.refresh_token))) {
            
                          
                            if (functions.empty(accountsExists)) {
                                try {
    
                                    // SAVE CREDENTIALS
                                    await Accounts.create({
                                        token: token,
                                        accounts: [
                                            {
                                                name: "twitch",
                                                access_token: access_token,
                                                refresh_token: refresh_token,
                                                user_name: user_profile_name,
                                                user_picture: user_profile_picture,
                                                user_id: user_profile_id,
                                                is_connected: true,
                                            }
                                        ]
                                    })
    
                                } catch (error) {
                                    if(error){ throw new Error(error) }
                                }
    
                            }else{
                                accountsExists = await Accounts.find({ token: token, "accounts.name": "twitch" });
                                accountsExists = Array.isArray(accountsExists)? accountsExists[0] : accountsExists;
                                
                                if (functions.empty(accountsExists)) {
    
                                    try {
    
                                        // SAVE CREDENTIALS
    
                                        await Accounts.updateOne(
                                            { "token": token },
                                            { "$push": { 
                                                    "accounts": {
                                                        "name": "twitch",
                                                        "access_token": access_token,
                                                        "refresh_token": refresh_token,
                                                        "user_name": user_profile_name,
                                                        "user_picture": user_profile_picture,
                                                        "user_id": user_profile_id,
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
                                        { "token": token, "accounts.name": "twitch" },
                                        { "$set": { 
                                                "accounts.$.access_token": access_token,
                                                "accounts.$.refresh_token": refresh_token,
                                                "accounts.$.user_name": user_profile_name,
                                                "accounts.$.user_picture": user_profile_picture,
                                                "accounts.$.user_id": user_profile_id,
                                                "accounts.$.is_connected": true
                                            } 
                                        }
                                    )
                                }
    
                            }
            
                        } else {
                            response.status(400).json({ "status": 400, "message": "Access token missing or expired, check and retry.", "data": payload });
                        }
                    }catch(error){
                        response.status(400).json({ "status": 400, "message": "Access token missing or expired, check and retry.", "data": payload });
                    }
            
            
                    payload["is_verified"] = functions.stringToBoolean(userExists.is_verified);
                    payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked);
                    payload["is_registered"] = functions.stringToBoolean(userExists.is_registered);
            
            
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






