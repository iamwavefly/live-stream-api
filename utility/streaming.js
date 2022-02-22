const { google } = require('googleapis');
const request_url = require('request');
const db = require("../models/index.js");
const USER = db.user;
const VIDEO = db.video;


module.exports = {

broadcast_youtube: ( title, description, scheduledStartTime, refreshtoken, userToken, videoId, callback ) => {
    
        var url = 'https://www.googleapis.com/oauth2/v4/token';
        var body = {
            "grant_type": "refresh_token",
            "refresh_token": refreshtoken,
            "client_id": process.env.GOOGLE_CLIENT_ID,
            "client_secret": process.env.GOOGLE_CLIENT_SECRET
        };

        request_url.post(url, {form: body, json: true}, async (err, res, body) => {
            
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                process.env.GOOGLE_CALLBACK_URL
            );

            oauth2Client.setCredentials({
                refresh_token: body.refresh_token,
                access_token: body.access_token,
            });

            //update the user access token and refresh token
            await USER.updateOne({token: userToken}, {
                $set: {
                    google_access_token: body.access_token,
                    google_refresh_token: body.refresh_token,
                }
            });

            const youtube = google.youtube({    
                version: 'v3',
                auth: oauth2Client,
            });

            //create a live broadcast
            const params = {
                part: 'id,snippet,status,contentDetails',
                resource: {
                snippet: {
                    title: title,
                    scheduledStartTime: scheduledStartTime,
                    description: description
                },
                contentDetails: {
                    enableAutoStart: true,
                    monitorStream: {
                        enableMonitorStream: true,
                        },
                },
                status: {
                    privacyStatus: 'public',
                    selfDeclaredMadeForKids: true
                },                    
                }};

            
            youtube.liveBroadcasts.insert(params, (err, broadcast_data) => {
            if (err) {
                console.log('Error Broadcast: ' + err);
                return;
            }
            let broadcastId = broadcast_data.data.id;

            //create a live stream 
            const params2 = {
                part: 'id,cdn,snippet,contentDetails,status',
                resource: {
                    snippet: {
                        title: title,
                        description: description
                    },
                    cdn: {
                        format: '1080p',
                        ingestionType: 'rtmp',
                        resolution: '1080p',
                        frameRate: '60fps',
                    },
                },
            };
            
            youtube.liveStreams.insert(params2, async (err, stream_data) => {
                if (err) {
                    console.log('Error Stream: ' + err);
                    return;
                }else {
                    // callback({ status: 200, message: "Live stream created", data: stream_data.data.cdn.ingestionInfo.streamName })
                    let streamName = stream_data.data.cdn.ingestionInfo.streamName;

                    let rtmpAddress = `rtmps://a.rtmps.youtube.com/live2/${streamName}` 
                    console.log(rtmpAddress, 'rtmpAddress');

                    //store the stream name and rtmp address in the database
                   await VIDEO.updateOne({token: userToken, video_id: videoId}, {
                        $set: {
                            youtube_rtmp_url: rtmpAddress
                        }
                    });
                    
                }
                let streamId = stream_data.data.id;

            //bind the stream to the broadcast
            const params3 = {
                part: 'id,contentDetails',
                id: broadcastId,
                resource: {
                    contentDetails: {
                        boundStreamId: streamId,
                    },
                },
            };
            
            youtube.liveBroadcasts.bind(params3, (err, data) => {
                if (err) {
                    console.log('Bind Error: ' + err);
                    return;
                }
                console.log('completed');
            });

            });

        });
    }
    

    );
},

//create a facebook live video object
create_facebook_live_video: ( title, description, facebookAccessToken, userToken, videoId, callback ) => {
      //get the user id from facebook
      let url = `https://graph.facebook.com/v12.0/me?access_token=${facebookAccessToken}`;

      let auth_req =  request_url(url, async (err, res, body) => {
      let user_id = JSON.parse(body).id;

      //check if boddy is empty
        if(body == ''){
            callback(
                console.log('Error: ' + err)
            );
        }else{

            //create a live broadcast on the user account 
            let url = `https://graph.facebook.com/v12.0/${user_id}/live_videos?access_token=${facebookAccessToken}`;
                
            const options = {
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    title: title,
                    description: description,
                    publish_enabled: true,
                    status: 'LIVE_NOW',
                },
                json: true
            };

            let live_video_req =  request_url(options, async (err, res, body) => {
                if(err){
                    response.status(500).json({ "status": 500, "message": "An error occured while creating the live video.", error: err })

                }else{
                    let secure_stream_url = body.secure_stream_url; 
                    console.log(secure_stream_url, 'secure_stream_url');
                    
                    //store the secure stream url and video id in the database
                        await VIDEO.updateOne({token: userToken, video_id: videoId}, {
                            $set: {
                                facebook_rtmp_url: secure_stream_url,
                            }
                        });
                    }

            }
            )}
    }
    
)},




    


}
