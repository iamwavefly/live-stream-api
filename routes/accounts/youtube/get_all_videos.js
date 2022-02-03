const path = require("path");
const dateUtil = require('date-fns');
const db = require("../../../models");
const functions = require("../../../utility/function.js")
var request_url = require('request');
const { google } = require('googleapis');
const https = require('https');

const USER = db.user;

module.exports = function (app) {
    let endpoint_directory = path.basename(path.dirname(__dirname));
    let endpoint_category = path.basename(path.dirname(__filename));

    //get all videos from my youtube account channel
    app.get(`/${endpoint_directory}/${endpoint_category}/get_all_videos`, async (request, response, next) => {
        try {  

            // token

            if (request.query.token) {

                const REDIRECT_URL = `${process.env.GOOGLE_CALLBACK_URL}`;

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

                    var url = 'https://www.googleapis.com/oauth2/v4/token';
                    var body = {
                        "grant_type": "refresh_token",
                        "refresh_token": userExists.google_refresh_token,
                        "client_id": process.env.GOOGLE_CLIENT_ID,
                        "client_secret": process.env.GOOGLE_CLIENT_SECRET
                    };

                    request_url.post(url, {form: body, json: true}, async (err, res, body) => {
                        
                        const oauth2Client = new google.auth.OAuth2(
                            process.env.GOOGLE_CLIENT_ID,
                            process.env.GOOGLE_CLIENT_SECRET,
                            `${REDIRECT_URL}`
                        );

                        
                        oauth2Client.setCredentials({
                            refresh_token: body.refresh_token,
                            access_token: body.access_token,
                        });

                       //update the user access token and refresh token
                          await USER.updateOne({token: request.body.token}, {
                            $set: {
                                google_access_token: body.access_token,
                                google_refresh_token: body.refresh_token,
                            }
                        });

                        const youtube = google.youtube({
                            version: 'v3',
                            auth: oauth2Client,
                        });

                        const get_videos = await youtube.channels.list({
                            part: 'contentDetails',
                            mine: true,
                        });

                        const channelId = get_videos.data.items[0].contentDetails.relatedPlaylists.uploads;

                        const get_uploaded_videos = await youtube.playlistItems.list({
                            part: 'snippet',
                            playlistId: channelId,
                            maxResults: 50,
                        });

                        response.status(200).json({ "status": 200, "message": "Youtube video upload response.", "data": get_uploaded_videos.data })

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