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

    app.put(`/${endpoint_category}/schedule_video`, async (request, response) => {

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
                                title: functions.empty(request.body.title)? videoExists.title : request.body.title,
                                description: functions.empty(request.body.description)? videoExists.description : request.body.description,
                                tags: functions.empty(request.body.tags)? videoExists.tags : request.body.tags,
                                is_scheduled: true,
                                status: "Scheduled",
                                is_facebook: functions.stringToBoolean(request.body.is_facebook)? true : false,
                                is_twitter: functions.stringToBoolean(request.body.is_twitter)? true : false,
                                is_instagram: functions.stringToBoolean(request.body.is_instagram)? true : false,
                                is_youtube: functions.stringToBoolean(request.body.is_youtube)? true : false,
                                is_twitch: functions.stringToBoolean(request.body.is_twitch)? true : false,
                                scheduled_by: userExists.name,
                                date: functions.empty(request.body.date)? videoExists.date : request.body.date,
                                time: functions.empty(request.body.time)? videoExists.time : request.body.time,
                                scheduled_start_times: moment(request.body.date + " " + request.body.time).format('YYYY-MM-DD HH:mm:ss')
              
                            },
                        );

                        videoExists = await VIDEO.find({ token: request.body.token, video_id: request.body.video_id})
                        videoExists = Array.isArray(videoExists)? videoExists[0] : videoExists;

                        payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                        payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                        payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                        payload["video"] = videoExists
                            
                         //schedule to youtube
                         if(videoExists.is_youtube === true) {
                            let broadcast_youtube = streaming.broadcast_youtube(
                                videoExists.title,
                                videoExists.description,
                                videoExists.scheduled_start_times,
                                userExists.google_refresh_token,
                                videoExists.token,
                                videoExists.video_id,
                                
                            )    
                          
                         }else{
                             console.log("Not youtube")
                         }

                         //schedule to facebook
                         if(videoExists.is_facebook === true) {
                            let broadcast_facebook = streaming.create_facebook_live_video(
                                videoExists.title,
                                videoExists.description,
                                userExists.facebook_access_token,
                                videoExists.token,
                                videoExists.video_id,
                            )
                         }else{
                                console.log("Not facebook")
                            }

                           

                        response.status(200).json({ "status": 200, "message": "Video has been scheduled successfully.", "data": payload });
                    
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