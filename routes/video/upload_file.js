const dateUtil = require('date-fns');
const path = require("path");
const functions = require("../../utility/function.js")
const AWS = require('aws-sdk');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const { getVideoDurationInSeconds } = require('get-video-duration')
const ffmpeg = require('fluent-ffmpeg');

const db = require("../../models");
const USER = db.user;
const VIDEO = db.video;

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
  })

  const upload = multer({storage: storage});

const s3Client = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION
});

const uploadParams = {
    Bucket: process.env.S3_BUCKET, 
    Key: null,
    Body: null,
    ContentEncoding: 'base64',
    ContentType: 'video/mp4, video/avi, video/webm, video/mkv',
};

// CACHE
const NodeCache = require('node-cache');
const cache_expiry = process.env.CACHE_EXPIRY_SECONDS;
const cache = new NodeCache({ stdTTL: cache_expiry, checkperiod: cache_expiry * 0.2, useClones: false });

module.exports = function (app) {
    let endpoint_category = path.basename(path.dirname(__filename));

    app.post(`/${endpoint_category}/upload_file`, upload.single("file"), async (request, response) => {

        /* 
        token
        file
        */

        if (request.body.token ) {

            let payload = {
                is_verified: false,
                is_blocked: false,
                is_registered: false,
                token: request.query.token
            }

            let userExists = await USER.find({ token: request.body.token})
            
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
                   
                    try{
                        if(!request.file){
                            throw new Error("No file was uploaded")

                        }else{

                            // const thumbnail_path = await functions.transcode_video(request.file.originalname, request.file.path)

                            // // get the generated thumbnail
                            // const thumbnails = fs.readFileSync(path.join(__dirname, `../../transcoded/${thumbnail_path}`), "utf8");
                            // console.log(thumbnails)

                            // Upload to S3
                            uploadParams.Key = `${request.file.originalname}`;
                            uploadParams.Body = fs.readFileSync(request.file.path);
                            s3Client.upload(uploadParams, async (err, data) => {
                                if (err) {
                                    response.status(500).send({
                                        "message": "Error uploading file to S3",
                                        "error": err
                                    });
                                }else{

                                    // Save to database
                                    let filename = "video_"+functions.uniqueId(6, "alphanumeric");
                                    uploadParams.Key = filename;
                                    await VIDEO.create({
                                        video_id: functions.uniqueId(10, "alphanumeric"),
                                        token: request.body.token,
                                        scheduled_by: userExists.user_id,
                                        name: filename,
                                        url: data.Location,
                                        size: request.file.size,
                                        // duration: await getVideoDurationInSeconds(request.file.path),
                                        status: "Queued",
                                        // thumbnail: thumbnail_path,
                                    })
                                    response.status(200).send({
                                        "message": "File uploaded successfully",
                                        "payload": payload,
                                        "data": data,
                                    })

                                    // Delete file from local storage
                                    fs.unlinkSync(request.file.path);
                                }
                               
                            });
                        }

                    }catch(error){
                        console.log(error)
                        throw new Error("An error occured while uploading video, please try again.")
                    }


                } catch (e) {
                    response.status(400).json({ "status": 400, "message": e.message, "data": payload });
                }

            } else {
                response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
            }

        } else {
            response.status(400).json({ "status": 400, "message": "Incomplete or missing requests parameter(s)", "data": null });
        }

    })


    app.post(`/${endpoint_category}/stream_file`, upload.single("file"), async (request, response) => {

        /* 
        token
        file
        */

        if (request.body.token ) {

            let payload = {
                is_verified: false,
                is_blocked: false,
                is_registered: false,
                token: request.query.token
            }

            let userExists = await USER.find({ token: request.body.token})
            
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

                    try{
                        if(!request.file){

                            response.status(400).json({ "status": 400, "message": "No file uploaded.", "data": null })

                        }else{
                            
                            try{

                                const stream_video_facebook =  functions.stream_video_facebook( 
                                    path_facebook = request.file.path,
                                    rtmp_server_url_facebook = 'rtmps://a.rtmps.youtube.com/live2/uMUEjBJP_91VxfjdvyBqNg1644832232551257'
                                     );
    
                                const stream_video_twitch =  functions.stream_video_twitch( 
                                    path_twitch = request.file.path,
                                    rtmp_server_url_twitch = 'rtmp://sfo.contribute.live-video.net/app/live_639382179_XZy5EtYfTOvJAV0S9Tq0dDrrLAKmgS?bandwidth_test=true'
                                     );
    
                                const stream_video_youtube =  functions.stream_video_youtube( 
                                    path_youtube = request.file.path,
                                    rtmp_server_url_youtube = 'rtmps://a.rtmps.youtube.com/live2/8e6u-cca0-x31f-uzew-1xhs',
                                     );
                                     
                                response.status(200).json({ 
                                    "status": 200, "message": "File uploaded successfully.",
                                    "data": {
                                        "facebook": stream_video_facebook,
                                        "twitch": stream_video_twitch,
                                        "youtube": stream_video_youtube
                                    }
                                })
                                
                                // fs.unlinkSync(request.file.path);

                            }catch(error){
                                console.log(error)
                                response.status(500).json({ "status": 500, "message": "An error occured while uploading video, please try again.", "data": null })
                            }
                        }

                }catch(err){
                        console.log(err) 
                        response.status(500).json({ "status": 500, "message": "An error occured while uploading the file.", "error": err })   
                }

                } catch (e) {
                    response.status(400).json({ "status": 400, "message": e.message, "data": payload });
                }

            } else {
                response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
            }

        } else {
            response.status(400).json({ "status": 400, "message": "Incomplete or missing requests parameter(s)", "data": null });
        }

    })

}