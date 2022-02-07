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
    app.post(`/${endpoint_directory}/${endpoint_category}/facebook_upload`, async (request, response, next) => {
        try {  

            // token
            // file_url

            if (request.body.token) {

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

                    //get the user id from facebook
                    let url = `https://graph.facebook.com/v12.0/me?access_token=${userExists.facebook_access_token}`;

                    let auth_req = await request_url(url, async (err, res, body) => {

                       let id = JSON.parse(body).id;

                    if(functions.empty(body)){ throw new Error("Access token and refresh token data are missing.") }

                    //create a live broadcast on the user account 
                    let url = `https://graph.facebook.com/v12.0/${id}/live_videos?access_token=${userExists.facebook_access_token}`;
                    
                    const options = {
                        method: 'POST',
                        url: url,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: {
                            title: request.body.title,
                            description: request.body.description,
                            publish_enabled: true,
                            status: 'LIVE_NOW',
                        },
                        json: true
                    };

                    let live_video_req = await request_url(options, async (err, res, body) => {
                        if(err){
                            response.status(500).json({ "status": 500, "message": "An error occured while creating the live video.", error: err })

                        }else{
                            response.status(200).json({ "status": 200, "message": "Live video created successfully.", data: body })
                            let stream_url = body.stream_url;
                            let secure_stream_url = body.secure_stream_url;
                            let video_id = body.id;
                        }
                    })

                    })
                        
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






    //upload video to facebook account
                    // https.get(request.body.file_url, async (stream) => {
                    //     try {
                          

                    //         const options = {
                    //             url: `https://graph-video.facebook.com/v2.11/me/videos?access_token=${userExists.facebook_access_token}`,
                    //             method: 'POST',
                    //             headers: {
                    //                 'Content-Type': 'multipart/form-data'
                    //             },
                    //             formData: {
                    //                 'file': {
                    //                     value: stream,
                    //                     options: {
                    //                         filename: 'file.mp4',
                    //                         contentType: 'video/mp4'
                    //                     }
                    //                 }
                    //             }
                    //         };

                    // request_url.post(options, async (err, res, body) => {
                    //     if (err) {
                    //         response.status(500).json({ "status": 500, "message": "Error uploading video to facebook live stream channel", data: JSON.parse(body) });
                    //     } else {
                    //         response.status(200).json({ "status": 200, "message": "Video uploaded to facebook live stream channel", data: JSON.parse(body)});
                    //     }
                    // });
                           

                    // } catch (error) {
                    //     if(error){ 
                    //         response.status(400).json({ "status": 400, "message": " video upload response.", "data": error })
                    //         }

                    // }
                    // });


                    // const options = {
                    //     url: `https://graph-video.facebook.com/v12.0/me/videos`,
                    //     method: 'POST',
                    //     headers: {
                    //         'Authorization': `Bearer ${userExists.facebook_access_token}`,
                    //         'Content-Type': 'application/json'
                    //     },
                    //     json: {
                    //         title: request.body.title,
                    //         description: request.body.description,
                    //         source: {
                    //             file_url: request.body.file_url
                    //         }
                    //     }
                    // }

                    // request_url(options, (error, response, body) => {
                    //     if (err) {
                    //         response.status(500).json({ "status": 500, "message": "Error uploading video to facebook live stream channel", data: JSON.parse(body) });
                    //     } else {
                    //         response.status(200).json({ "status": 200, "message": "Video uploaded to facebook live stream channel", data: JSON.parse(body)});
                    //     }
                    // })