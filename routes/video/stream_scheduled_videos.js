const functions = require("../../utility/function.js")
const db = require("../../models");
const VIDEO = db.video;


module.exports = function (app) {

    const get_scheduled_videos = async (request, response) => {
        try {
            let videoExists = await VIDEO.find({ token: 'jqCClg2uUttZAl1Xslu7pegdQjX0Uq', video_id: 'e2trUfdCNC'})
            videoExists = Array.isArray(videoExists)? videoExists[0] : videoExists;

            let videouRL = videoExists.url;
            let videoId = videoExists.video_id;
            let facebbokRtmp = videoExists.facebook_rtmp_url;
            let youtubeRtmp = videoExists.youtube_rtmp_url;

            //download the video
            const download_video_file = functions.download_video(
                videouRL,
                videoId,
                //callback
                (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("video downloaded");
                    }
                }
            )

            //get the video file path
            const upload_path = `${__dirname}/../../uploads/${videoId}.mp4`;
            
                //stream to social media platforms
                try{
                    const stream_video_facebook = functions.stream_video_facebook(
                        upload_path,
                        facebbokRtmp,
                      );
        
                    const stream_video_youtube = functions.stream_video_youtube(
                        upload_path,
                        youtubeRtmp,
                      );

                }catch(err){
                    console.log(err);
                }
        
        } catch (err) {
            console.log(err);
        }
    }

    //run cron here
    // var CronJob = require('cron').CronJob;
    // var job = new CronJob('5 * * * * *', function() {
    //     get_scheduled_videos()
    // }, null, true, 'America/Los_Angeles');
    // job.start();

}