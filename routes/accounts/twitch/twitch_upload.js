const path = require("path");
const dateUtil = require('date-fns');
const db = require("../../../models");
const functions = require("../../../utility/function.js")
var request_url = require('request');
const https = require('https');

const USER = db.user;

module.exports = function (app) {
    let endpoint_directory = path.basename(path.dirname(__dirname));
    let endpoint_category = path.basename(path.dirname(__filename));
    //upload video
    app.post(`/${endpoint_directory}/${endpoint_category}/twitch_upload`, async (request, response, next) => {
        try {  

            // token
            // file_url

            if (request.body.token && request.body.file_url) {

                const REDIRECT_URL = `${process.env.TWITTER_CALLBACK_URL}`;

                let payload = {
                    is_verified: false,
                    is_blocked: false,
                    is_registered: false,
                    token: request.body.token
                }

                let userExists = await USER.find({ token: request.body.token})
                
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

                    //upload a video to twitch channel
                    const options = {
                        url: `https://api.twitch.tv/kraken/channels/${userExists.twitch_channel_id}/videos`,
                        method: 'POST',
                        headers: {
                            'Client-ID': process.env.TWITCH_CLIENT_ID,
                            'Authorization': `OAuth ${userExists.token}`,
                            'Content-Type': 'application/json'
                        },
                        json: {
                            "title": "",
                            "description": "",
                            "game": "",
                            "language": "",
                            "tag_list": "",
                            "broadcast_type": "",
                            "is_processing": false,
                            "is_playlist": false,
                            "url": request.body.file_url
                        }
                    };

                    request_url(options, function (error, response, body) {
                        if (error) {
                            throw new Error(error);
                        }
                        if (response.statusCode == 200) {
                            response.json(body);
                        } else {
                            throw new Error(body);
                        }
                    });

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