const { google } = require('googleapis');
const request_url = require('request');
const db = require("../models/index.js");
const USER = db.user;
const VIDEO = db.video;


module.exports = {
//create a youtube broadcast and bind to live stream
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
                    console.log('youtube rtmp address created: ');

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
                    console.log('facebook live video created');
                    
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

//get a users twictch stream key
get_twitch_stream_key: ( user_refresh_token, twitch_id, title, callback ) => {
    let url = 'https://id.twitch.tv/oauth2/token';

    let body = {
        "grant_type": "refresh_token",
        "client_id": process.env.TWITCH_CLIENT_ID,
        "client_secret": process.env.TWITCH_CLIENT_SECRET,
        "refresh_token": user_refresh_token,
    };

    request_url.post(url, {form: body, json: true}, async (err, res, body) => {
        if(err){
            
                console.log('Error: ' + err)
            
        }else{
            //update the user access token and refresh token
            await USER.updateOne({twitch_id: twitch_id}, {
                $set: {
                    twitch_access_token: body.access_token,
                    twitch_refresh_token: user_refresh_token,
                }
            });
        
        }

        //update the stream info on twitch
        let urlss = `https://api.twitch.tv/helix/channels?broadcaster_id=${twitch_id}`;
        
        let header = {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${body.access_token}`
        };
        
        let bodys = {
            "title": title,
        }

        request_url.patch(urlss, {headers: header, form: bodys, json: true}, async (err, res, body) => {
            if(err){
                console.log('Error: ' + err)
            }else{
                console.log ('twitch stream created');
            }
        })

        //get the users stream key
        let urls = `https://api.twitch.tv/helix/streams/key?broadcaster_id=${twitch_id}`;

        let headers = {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${body.access_token}`
        };

        request_url.get(urls, {headers: headers, json: true}, async (err, res, body) => {
            if(err){
                
                    console.log('Error: ' + err)
                
            }else{
                    //store the stream key in the database
                    await VIDEO.updateOne({twitch_id: twitch_id}, {
                        $set: {
                            twitch_rtmp_url: `rtmp://sfo.contribute.live-video.net/app/${body.data[0].stream_key}`,
                        }
                    });
            
            }
        });



    });

   

}

}
