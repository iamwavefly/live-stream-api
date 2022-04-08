                            // //stream to youtube
                            // if(is_youtube[0] === true){
                            //     for(let i = 0; i < videos.length; i++){
                            //         if(videos[i].is_youtube === true){
                            //             //change the status to streaming
                            //             VIDEO.updateOne({video_id: video_ids[i]}, {$set: {status: "Streaming"}}, (err, data) => {
                            //                 if(err) {
                            //                     console.log(err);
                            //                 } else {
                            //                     console.log("video status updated to Streaming");
                            //                     console.log(data);
                            //                 }
                            //             })
    
                            //             let stream_video_youtube = functions.stream_video_youtube(
                            //                 `${__dirname}/../../uploads/${video_ids[i]}.mp4`,
                            //                 // 'rtmp://a.rtmp.youtube.com/live2/xmes-atw2-06xx-41gw-eyam',
                            //                 youtube_rtmp_urls[i],
                            //                 //callback
                            //                 function(data) {
                            //                     if(data.status === 200) {
                            //                         //update the video status
                            //                         VIDEO.updateOne({video_id: video_ids[i]}, {$set: {
                            //                             status: "Streamed",
                            //                             youtube_rtmp_url: "",
                            //                             is_scheduled: false,
                            //                         }}, (err, data) => {
                            //                             if(err) {
                            //                                 console.log(err);
                            //                             } else {
                            //                                 console.log("youtube stream completed");
                            //                                 console.log(data);
                            //                             }
                            //                         })
                            //                     }
                            //                 });
                            //             youtube_streams.push(stream_video_youtube);  //push the stream to the array
                            //         }
                            //     }
                            // }

                            // //stream to twitch
                            // if(is_twitch[0] === true){
                            //     for(let i = 0; i < videos.length; i++){
                            //         if(videos[i].is_twitch === true){
                            //             //change the status to streaming
                            //             VIDEO.updateOne({video_id: video_ids[i]}, {$set: {status: "Streaming"}}, (err, data) => {
                            //                 if(err) {
                            //                     console.log(err);
                            //                 } else {
                            //                     console.log("video status updated to Streaming");
                            //                     console.log(data);
                            //                 }
                            //             })

                            //             let stream_video_twitch = functions.stream_video_twitch(
                            //                 `${__dirname}/../../uploads/${video_ids[i]}.mp4`,
                            //                 twitch_rtmp_urls[i],
                            //                 //callback
                            //                 function(data) {
                            //                     if(data.status === 200) {
                            //                         //update the video status
                            //                         VIDEO.updateOne({video_id: video_ids[i]}, {$set: {
                            //                             status: "Streamed",
                            //                             twitch_rtmp_url: "",
                            //                             is_scheduled: false,
                            //                         }}, (err, data) => {
                            //                             if(err) {
                            //                                 console.log(err);
                            //                             } else {
                            //                                 console.log("twitch stream completed");
                            //                                 console.log(data);
                            //                             }
                            //                         })
                            //                     }
                            //                 });
                            //             twitch_streams.push(stream_video_twitch);  //push the stream to the array
                            //         }
                            //     }
                            // }



                            mongodb+srv://sparkler:sparkler12345@sparkle.pvnng.mongodb.net/records?retryWrites=true&w=majority





                            MODE = development
PORT = 5000
WEB_CONCURRENCY = 1

MAX_FILE_SIZE=209715200

APP_NAME = LiveSnapp
APP_DOMAIN =livesnapp.co
APP_EMAIL = hello@livesnapp.co

ELASTICEMAIL_API_KEY = 7639A402CB35B54B8F91BE0839A0D54F9A335270F7F14522104D14F317B9A3C988A6F7061A2B3FAE30A3E4E912C7F0EA

MONGO_URI=mongodb://localhost:27017/livesnapp

TOKEN_EXPIRY_MINUTES = 43200
CACHE_EXPIRY_SECONDS = 0

S3_ACCESS_KEY = AKIAXQ4UAES4V5EIXMFL
S3_SECRET_KEY = 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
S3_BUCKET = worldbankpayint
S3_REGION = us-east-2

GOOGLE_CLIENT_ID=992078024233-ilt68ao3fbek0ns1n1tngm6ok1b7e78n.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:5000/accounts/youtube/callback

GOOGLE_DRIVE_CALLBACK_URL=http://localhost:5000/accounts/google_drive/callback_google_drive

FACEBOOK_CLIENT_ID=271254238427383
FACEBOOK_CLIENT_SECRET=fe1d49d86bd3ab94701bf753e9a97a6d
FACEBOOK_CALLBACK_URL=http://localhost:5000/accounts/facebook/facebook_callback

TWITCH_CLIENT_ID=7hyj501jhal98e328czyhhg8craroc
TWITCH_CLIENT_SECRET=o1xmlj58h7ocuoe0rqkud2s5znav1h
TWITCH_CALLBACK_URL=http://localhost:5000/accounts/twitch/twitch_callback

TWITTER_CLIENT_ID=TnhRaGdWeG1Hb01mUE9HVHhya1M6MTpjaQ
TWITTER_CLIENT_SECRET=t9o3rd2gs56lKkKWD8Mn-7mNxfQO8W_D24N-A2770C-FC88Ow9
TWITTER_CALLBACK_URL=http://localhost:5000/accounts/twitter/twitter_callback

FFMPEG_DOWNLOAD_URL=https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-github

REDIS_HOST=LiveSnap
REDIS_PORT=6379
REDIS_PASSWORD=fP77YVoyCO4Rdf0NCoNnVQdmFwi3Lex1
MODE=development

FFMPEG_PATH=/app/vendor/ffmpeg/ffmpeg
# FFMPEG_PATH=C:\Program Files\ffmpeg\bin\ffmpeg.exe
# FFPROBE_PATH=C:\Program Files\ffmpeg\bin\ffprobe.exe

# web: node --optimize_for_size --max_old_space_size=920 app.js