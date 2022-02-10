const path = require("path");
const dateUtil = require('date-fns');
const db = require("../../../models");
const functions = require("../../../utility/function.js");
const fluentFfmpeg = require('fluent-ffmpeg');
const ffmpeg = require('ffmpeg');
var request_url = require('request');
const https = require('https');
const fs = require('fs');
const multer = require('multer');

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

const USER = db.user;

module.exports = function (app) {
    let endpoint_directory = path.basename(path.dirname(__dirname));
    let endpoint_category = path.basename(path.dirname(__filename));

    
    //create live video object
    app.post(`/${endpoint_directory}/${endpoint_category}/facebook_upload`, upload.single("file"), async (request, response, next) => {
        try {  
            // token

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
                    let user_id = JSON.parse(body).id;

                    if(functions.empty(body)){ throw new Error("Access token and refresh token data are missing.") }

                    //create a live broadcast on the user account 
                    let url = `https://graph.facebook.com/v12.0/${user_id}/live_videos?access_token=${userExists.facebook_access_token}`;
                    
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
                            // response.status(200).json({ "status": 200, "message": "Live video created successfully.", data: body })
                            let stream_url = body.stream_url;
                            let secure_stream_url = body.secure_stream_url;
                            let video_id = body.id;

                            try{
                                if(!request.file){

                                    response.status(400).json({ "status": 400, "message": "No file uploaded.", "data": null })

                                }else{
                                    const stream = await functions.stream_video( request.file.path, secure_stream_url );

                                    response.status(200).json({ "status": 200, "message": "File uploaded successfully.", "data": stream })
                                
                                    //delete file from local storage
                                    fs.unlinkSync(request.file.path);
                                }

                        }catch(err){
                            console.log(err);
                            response.status(500).json({ "status": 500, "message": "An error occured while uploading the file.", "error": err })
                            
                        }
                 }})
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


    //get live video object
    app.get(`/${endpoint_directory}/${endpoint_category}/live_video_object`, async (request, response, next) => {
        try {

            // token

            if (request.query.token) {

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

                    //get a single live video object from facebook
                    let url = `https://graph.facebook.com/v12.0/me/live_videos?access_token=${userExists.facebook_access_token}`;
                    
                    let get_live_video_req = await request_url(url, async (err, res, body) => {
                        if(err){
                            response.status(500).json({ "status": 500, "message": "An error occured while getting the live video.", "error": err })

                        }else{
                            response.status(200).json({ "status": 200, "message": "Live video fetched successfully.", "data": body })
                        }})

                        
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