const path = require("path");
const dateUtil = require('date-fns');
var request_url = require('request');
const db = require("../../../models");
const { google } = require('googleapis');
const axios = require('axios');
const fs = require("fs");

const functions = require("../../../utility/function.js")
const USER = db.user;

const youtube = google.youtube('v3');

module.exports = function (app) {
    let endpoint_directory = path.basename(path.dirname(__dirname));
    let endpoint_category = path.basename(path.dirname(__filename));

    app.get(`/${endpoint_directory}/${endpoint_category}/callback_google_drive`, async (request, response, next) => {
        try {

            const REDIRECT_URL = `${process.env.GOOGLE_DRIVE_CALLBACK_URL}`;
        
            let payload = {
                is_verified: false,
                is_blocked: false,
                is_registered: false
            }

            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                `${REDIRECT_URL}`
            );

            let authorization_code = request.query.code
            
            let token_response = await oauth2Client.getToken(authorization_code)
            
            body = token_response.tokens

            oauth2Client.setCredentials({
                access_token: body.access_token,
                refresh_token: body.refresh_token
            });

            
            const drive = google.drive({
                version: 'v3',
                auth: oauth2Client,
            });
            
            
            if(functions.empty(body)){ throw new Error("Access token and refresh token data are missing.") }

            if(!functions.empty(body.access_token) || !functions.empty(body.refresh_token)){
            
                let token = request.query.state

                let userExists = await USER.find({ token: token})
                //save access token and refresh token to the database
                let user = await USER.findOneAndUpdate({ token: token }, {
                    $set: {
                        token: token,
                        google_access_token: body.access_token,
                        google_refresh_token: body.refresh_token,
                        is_connected_google: true
                    }
                }, { new: true })
                
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


                        payload["is_verified"] = functions.stringToBoolean(userExists.is_verified)
                        payload["is_blocked"] = functions.stringToBoolean(userExists.is_blocked)
                        payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)

                    


                        //GET FILE LIST
                        // drive.files.list({
                        //     pageSize: 10,
                        //     fields: 'nextPageToken, files(id, name)',
                        //   }, (err, res) => {

                        //     if (err) {
                        //         response.status(400);json({
                        //             "message": "Error while getting files from google drive",
                        //             "error": err

                        //         })
                        //     }

                        //     const files = res.data.files;
                        //     if (files.length) {
                        //         response.status(200).json({
                        //             "message": "Successfully connected to google drive",
                        //             "data": {
                        //                 "files": files
                        //             }
                        //         })
                        //     } else {
                        //       response.status(200).json({
                        //             "message": "No files found"
                        //         })
                        //     }
                        //   });



                        

                         //download file from google drive to local storage
                         let file_id = "14ky3Bi_sT2BPHVgvuoOY6vqsYmUW4o-M"
                         let dest = fs.createWriteStream(path.join(__dirname, '../../uploads'));
                         drive.files.get({
                             fileId: file_id,
                             alt: 'media'
                         }, (err, res) => {
                             if (err) 
                                 response.status(400).json({
                                     "message": "Error while getting files from google drive",
                                     "error": err

                                 })
                             
                                 .on('end', () => {
                                     console.log('Done');
                                 })
                                 .on('error', err => {
                                     console.log('Error', err);
                                 })
                                 .pipe(dest);
                         });
                        
                        // var fileId = '14ky3Bi_sT2BPHVgvuoOY6vqsYmUW4o-M';
                        // var dest = fs.createWriteStream(path.join(__dirname, '../../uploads'));
                        // drive.files.get({
                        //   fileId: fileId,
                        //   alt: 'media'
                        // })
                        //     .on('end', function () {
                        //       console.log('Done');
                        //     })
                        //     .on('error', function (err) {
                        //       console.log('Error during download', err);
                        //     })
                        //     .pipe(dest);


                    } catch (e) {
                        response.status(400).json({ "status": 400, "message": e.message, "data": payload });
                    }

                } else {
                    response.status(400).json({ "status": 400, "message": "User account access authentication credentials failed, check and retry.", "data": payload });
                }

            }else {
                response.status(400).json({ "status": 400, "message": "Access token missing or expired, check and retry.", "data": payload });
            }

        } catch (error) {
            response.status(400).json({ "status": 400, "message": error.message, "data": null });
        }
    })

}