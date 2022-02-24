const dateUtil = require('date-fns');
const path = require("path");
const functions = require("../../utility/function.js")

const db = require("../../models");
const USER = db.user;
const VIDEO = db.video;

// CACHE
const NodeCache = require('node-cache');
const cache_expiry = process.env.CACHE_EXPIRY_SECONDS;
const cache = new NodeCache({ stdTTL: cache_expiry, checkperiod: cache_expiry * 0.2, useClones: false });

module.exports = function (app) {
    let endpoint_category = path.basename(path.dirname(__filename));

    app.get(`/${endpoint_category}/get_videos`, async (request, response) => {

        /* 
        token
        */

        if (request.query.token) {

            let payload = {
                is_verified: false,
                is_blocked: false,
                is_registered: false,
                token: request.query.token
            }

            let userExists = await USER.find({ token: request.query.token})
            let videoExists = await VIDEO.find({ token: request.query.token})

            if (!functions.empty(userExists)) {
                try {
                    // userExists = Array.isArray(userExists)? userExists[0] : userExists;

                    // Check if token has expired
                    const difference = Math.abs(dateUtil.differenceInMinutes(new Date(userExists.token_expiry), new Date()))
                    if (difference > process.env.TOKEN_EXPIRY_MINUTES) {
                        payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                        payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                        payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                        throw new Error("This user authentication token has expired, login again retry.")
                    }

                    // Check if cached is expired
                    const cache_key = `${request.route.path}_${request.query.token}`;
                    if (cache.has(cache_key)) {
                        const report = cache.get(cache_key);
                        payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                        payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                        payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                        payload["videos"] = report
                        response.status(200).json({ "status": 200, "message": `User account details has been fetched successfully.`, "data": payload });
                        return true;
                    }

                    payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                    payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                    payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
                    payload["videos"] = videoExists,
                    payload["queued_videos_length"] = videoExists.filter(video => video.status === "Queued").length
                    payload["scheduled_videos_length"] = videoExists.filter(video => video.status === "Scheduled").length
                    payload["streaming_videos_length"] = videoExists.filter(video => video.status === "Streaming").length
                    payload["streamed_videos_length"] = videoExists.filter(video => video.status === "Streamed").length
                    payload["failed_videos_length"] = videoExists.filter(video => video.status === "Failed").length
                    
                    cache.set(cache_key, videoExists);
                    response.status(200).json({ "status": 200, "message": "videos has been fetched successfully.", "data": payload });
                
                } catch (e) {
                    response.status(400).json({ "status": 400, "message": e.message, "data": payload });
                }
                
            } else {
                response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
            }

        } else {
            response.status(400).json({ "status": 400, "message": "Incomplete or missing requests parameter(s)", "data": null });
        }

    });

}