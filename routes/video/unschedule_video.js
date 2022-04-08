const dateUtil = require('date-fns');
const path = require("path");
const functions = require("../../utility/function.js")
const streaming = require("../../utility/streaming.js")
const db = require("../../models");
const USER = db.user;
const VIDEO = db.video;
var moment = require('moment'); // require
moment().format('yyyy-MM-dd HH:mm:ss');


module.exports = function (app) {
    let endpoint_category = path.basename(path.dirname(__filename));

    app.put(`/${endpoint_category}/unschedule_video`, async (request, response) => {

        /* 
        token
        video_id
        title
        description
        tags
        stream_date
        stream_time
        is_scheduled
        status
        is_facebook
        is_twitter
        is_instagram
        is_youtube
        is_twitch
        */
       
        if (request.body.token && request.body.video_id) {

            let payload = {
                is_verified: false,
                is_blocked: false,
                is_registered: false,
                // token: request.body.token
            }

            let userExists = await USER.find({ token: request.body.token})
            let videoExists = await VIDEO.find({ token: request.body.token, video_id: request.body.video_id})

            if (!functions.empty(userExists)) {

                if (!functions.empty(videoExists)) {

                    try {

                        userExists = Array.isArray(userExists)? userExists[0] : userExists;
                        videoExists = Array.isArray(videoExists)? videoExists[0] : videoExists;

                        // Check if token has expired
                        const difference = Math.abs(dateUtil.differenceInMinutes(new Date(userExists.token_expiry), new Date()))
                        if (difference > process.env.TOKEN_EXPIRY_MINUTES) {
                            payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                            payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                            payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                            throw new Error("This user authentication token has expired, login again retry.")
                        }

                        await VIDEO.updateOne(
                            {token: request.body.token, video_id: request.body.video_id },
                            {
                                title: "",
                                description: "",
                                tags: "",
                                date: "",
                                time: "",
                                is_scheduled: false,
                                status: "Queued",
                                is_facebook: false,
                                is_twitter: false,
                                is_instagram:  false,
                                is_youtube: false,
                                is_twitch: false,
                                scheduled_by: "",
                                scheduled_start_times: "",
                                youtube_rtmp_url: "",
                                facebook_rtmp_url: "",
                                twitter_rtmp_url: "",
                                instagram_rtmp_url: "",
                                twitch_rtmp_url: "",
                            },
                        );

                        videoExists = await VIDEO.find({ token: request.body.token, video_id: request.body.video_id})
                        videoExists = Array.isArray(videoExists)? videoExists[0] : videoExists;

                        payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                        payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                        payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                        payload["video"] = videoExists
                           

                        response.status(200).json({ "status": 200, "message": "Video has been removed successfully.", "data": payload });
                    
                    } catch (e) {
                        response.status(400).json({ "status": 400, "message": e.message, "data": payload });
                    }

                } else {
                    response.status(400).json({ "status": 400, "message": "This video credentials doesn't match any record, check and retry.", "data": payload });
                }

            } else {
                response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
            }

        } else {
            response.status(400).json({ "status": 400, "message": "Incomplete or missing requests parameter(s)", "data": null });
        }

    })

}