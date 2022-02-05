const path = require("path");
const dateUtil = require('date-fns');
var request_url = require('request');
const db = require("../../../models");

const functions = require("../../../utility/function.js")
const USER = db.user;

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


            let url = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${request.query.code}`;

            let auth_req = await request_url(url, async (err, res, body) => {
               
                let access_token = JSON.parse(body).access_token;
        
      if(functions.empty(body)){ throw new Error("Access token and refresh token data are missing.") }

            if(!functions.empty(access_token) ){
            
                let token = request.query.state

                let userExists = await USER.find({ token: token})
                
                //save access token and refresh token to the database
                let user = await USER.findOneAndUpdate({ token: token }, {
                    $set: {
                        token: token,
                        facebook_access_token: access_token,
                        // facebook_refresh_token: refresh_token,
                    }
                }, { new: true })
                
                if (!functions.empty(userExists)) {

                    try {

                        userExists = Array.isArray(userExists)? userExists[0] : userExists;

                        // Check if token has expired
                        const difference = Math.abs(dateUtil.differenceInMinutes(new Date(userExists.token_expiry), new Date()))
                        if (difference > process.env.TOKEN_EXPIRY_MINUTES) {
                            payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                            payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                            payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                            throw new Error("This user authentication token has expired, login again retry.")
                        }


                        payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                        payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                        payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)

                        response.redirect('https://live-snap-front-end.herokuapp.com')

                    } catch (e) {
                        response.status(400).json({ "status": 400, "message": e.message, "data": payload });
                    }

                } else {
                    response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
                }

            } else {
                response.status(400).json({ "status": 400, "message": "Access token missing or expired, check and retry.", "data": payload });
            }
            });
            

        } catch (error) {
            response.status(400).json({ "status": 400, "message": error.message, "data": null });
        }
    })

}