const path = require("path");
const dateUtil = require('date-fns');
var request_url = require('request');
const db = require("../../../models");
const axios = require('axios');

const functions = require("../../../utility/function.js")
const USER = db.user;

module.exports = function (app) {
    let endpoint_directory = path.basename(path.dirname(__dirname));
    let endpoint_category = path.basename(path.dirname(__filename));

    app.get(`/${endpoint_directory}/${endpoint_category}/twitter_callback`, async (request, response, next) => {
        try {

            const REDIRECT_URL = `${process.env.TWITCH_CALLBACK_URL}`;
        
            let payload = {
                is_verified: false,
                is_blocked: false,
                is_registered: false
            }
            
            const exchange_token_url = `https://api.twitter.com/2/oauth2/token?client_id=${process.env.TWITTER_CLIENT_ID}&code=${request.query.code}&grant_type=authorization_code&code_verifier=challenge&redirect_uri=${REDIRECT_URL}`;

            const exchange_token_response = await axios.post(exchange_token_url);

            const access_token = exchange_token_response.data.access_token;
            const refresh_token = exchange_token_response.data.refresh_token;

            if (functions.empty(exchange_token_response.data)) { throw new Error("Access token and refresh token data are missing."); }

            if (!functions.empty(exchange_token_response.data.access_token || !functions.empty(exchange_token_response.data.refresh_token))) {

                let token = request.query.state;
                

                let userExists = await USER.find({ token: token });

                //save access token and refresh token to the database
                let user = await USER.findOneAndUpdate({ token: token }, {
                    $set: {
                        token: token,
                        twitch_access_token: exchange_token_response.data.access_token,
                        twitch_refresh_token: exchange_token_response.data.refresh_token,
                    }
                }, { new: true });

                if (!functions.empty(userExists)) {

                    try {

                        userExists = Array.isArray(userExists) ? userExists[0] : userExists;

                        // Check if token has expired
                        const difference = Math.abs(dateUtil.differenceInMinutes(new Date(userExists.token_expiry), new Date()));
                        if (difference > process.env.TOKEN_EXPIRY_MINUTES) {
                            payload["is_verified"] = functions.stringToBoolean(userExists.is_verified);
                            payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked);
                            payload["is_registered"] = functions.stringToBoolean(userExists.is_registered);
                            throw new Error("This user authentication token has expired, login again retry.");
                        }


                        payload["is_verified"] = functions.stringToBoolean(userExists.is_verified);
                        payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked);
                        payload["is_registered"] = functions.stringToBoolean(userExists.is_registered);

                        response.redirect('https://live-snap-front-end.herokuapp.com');

                    } catch (e) {
                        response.status(400).json({ "status": 400, "message": e.message, "data": payload });
                    }

                } else {
                    response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
                }

            } else {
                response.status(400).json({ "status": 400, "message": "Access token missing or expired, check and retry.", "data": payload });
            }
            

        } catch (error) {
            response.status(400).json({ "status": 400, "message": error.message, "data": null });
        }
    })

}