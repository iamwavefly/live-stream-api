const path = require("path");
const dateUtil = require('date-fns');
const db = require("../../../models");
const functions = require("../../../utility/function.js")
const USER = db.user;

module.exports = function (app) {
    let endpoint_directory = path.basename(path.dirname(__dirname));
    let endpoint_category = path.basename(path.dirname(__filename));

    app.get(`/${endpoint_directory}/${endpoint_category}/twitch_auth`, async (request, response, next) => {
        try {
            if (request.query.token) {

                const REDIRECT_URL = `${process.env.TWITCH_CALLBACK_URL}`;
                
                    let payload = {
                        is_verified: false,
                        is_blocked: false,
                        is_registered: false,
                        token: request.query.token
                    }
    
                    let userExists = await USER.find({ token: request.query.token})
                    
                    if (!functions.empty(userExists)) {
    
                        userExists = Array.isArray(userExists)? userExists[0] : userExists;
                        
    
                        // Check if token has expired
                        const difference = Math.abs(dateUtil.differenceInMinutes(new Date(userExists.token_expiry), new Date()))
                        if (difference > process.env.TOKEN_EXPIRY_MINUTES) {
                            payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                            payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                            payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                            throw new Error("This user authentication token has expired, login again retry.")
                        }

                        //initialize twitch oauth2 client with app id and secret
                        
                        const granted_scopes = [ 'user:read:email', 'channel_stream', 'channel_editor', 'channel:read:stream_key', 'channel:manage:schedule' ];

                        const twitch_auth_url = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=${granted_scopes.join(' ')}&force_verify=true&state=${request.query.token}`;

    
                        response.status(200).json({ "status": 200, "message": "Youtube authentication response.", "data": twitch_auth_url })
    
                    } else {
                        response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
                    }
    
                } else {
                    response.status(400).json({ "status": 400, "message": "Incomplete or missing requests parameter(s)", "data": null });
                }
            
        } catch (error) {
            response.status(400).json({ "status": 400, "message": error.message, "data": null });
        }
    })

}