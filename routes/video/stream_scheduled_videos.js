const functions = require("../../utility/function.js")
const db = require("../../models");
const VIDEO = db.video;
const path = require("path");
const fs = require("fs");
var cron = require('node-cron');
const dateUtil = require('date-fns');

module.exports = function (app) {

cron.schedule('*/2 * * * *', async (request, response) => {
    console.log("running cron job every 2 minutes");
        try {

            let videos = await VIDEO.find({ status: "Scheduled", scheduled: true });
            videos = Array.isArray(videos)? videos : [videos];
            let video_ids = videos.map(video => video.video_id);
            let video_urls = videos.map(video => video.url);
            let facebook_rtmp_urls = videos.map(video => video.facebook_rtmp_url);
            let youtube_rtmp_urls = videos.map(video => video.youtube_rtmp_url);
            let twitch_rtmp_urls = videos.map(video => video.twitch_rtmp_url);
            let facebook = videos.map(video => video.facebook);
            let youtube = videos.map(video => video.youtube);
            let twitch = videos.map(video => video.twitch);
            let scheduled_start_times = videos.map(video => video.scheduled_start_times);
            let facebook_streams = [];
            let youtube_streams = [];
            let twitch_streams = [];
    
            for (let i = 0; i < scheduled_start_times.length; i++) {

                let scheduled_start_time = scheduled_start_times[i];
    
                if (scheduled_start_time) {

                    let scheduled_start_time_iso = new Date(scheduled_start_time);
    
                    if (scheduled_start_time_iso) {

                        let difference = Math.abs(dateUtil.differenceInMinutes(new Date(scheduled_start_time_iso), new Date()));

    
                        if (videos.length > 0 && difference <= 1 ) {
    
                            //download the videos separately
                            for(let i = 0; i < video_ids.length; i++){
                                const download_video_file = await functions.download_video(
                                    video_urls[i],
                                    video_ids[i],
                                    //callback
                                    (err, data) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log("video downloaded");
                                        }
                                    }
                                )
                            }
        
                            //stream the downloaded videos 
                            if(facebook[0] === "facebook" || youtube[0] === "youtube" || twitch[0] === "twitch"){ 
                                for(let i = 0; i < videos.length; i++){
                                    if(videos[i].facebook === "facebook" || videos[i].youtube === "youtube" || videos[i].twitch === "twitch"){
                                        //change the status to streaming
                                        VIDEO.updateOne({video_id: video_ids[i]}, {$set: {status: "Streaming"}}, (err, data) => {
                                            if(err) {
                                                console.log(err);
                                            } else {
                                                console.log("video status updated to Streaming");
                                            }
                                        })
    

                                        if(videos[i].facebook === "facebook"){
                                            let stream_video_facebook = functions.stream_video_facebook(
                                                `${__dirname}/../../uploads/${video_ids[i]}.mp4`,
                                                facebook_rtmp_urls[i],
                                                //callback
                                                function(data) {
                                                    if(data.status === 200) {
                                                        //update the video status
                                                        VIDEO.updateOne({video_id: video_ids[i]}, {$set: {
                                                            status: "Streamed",
                                                            facebook_rtmp_url: "",
                                                            scheduled: false,
                                                        }}, (err, data) => {
                                                            if(err) {
                                                                console.log(err);
                                                            } else {
                                                                console.log("facebook stream completed");
                                                            }
                                                        })
                                                    }
                                                });

                                                facebook_streams.push(stream_video_facebook);  //push the stream to the array
                                        }


                                        if(videos[i].youtube === "youtube"){
                                            let stream_video_youtube = functions.stream_video_youtube(
                                                `${__dirname}/../../uploads/${video_ids[i]}.mp4`,
                                                // 'rtmp://a.rtmp.youtube.com/live2/xmes-atw2-06xx-41gw-eyam',
                                                youtube_rtmp_urls[i],
                                                //callback
                                                function(data) {
                                                    if(data.status === 200) {
                                                        //update the video status
                                                        VIDEO.updateOne({video_id: video_ids[i]}, {$set: {
                                                            status: "Streamed",
                                                            youtube_rtmp_url: "",
                                                            scheduled: false,
                                                        }}, (err, data) => {
                                                            if(err) {
                                                                console.log(err);
                                                            } else {
                                                                console.log("youtube stream completed");
                                                            }
                                                        })
                                                    }
                                                });

                                                youtube_streams.push(stream_video_youtube);  //push the stream to the array
                                        }


                                        if(videos[i].twitch === "twitch"){
                                            let stream_video_twitch = functions.stream_video_twitch(
                                                `${__dirname}/../../uploads/${video_ids[i]}.mp4`,
                                                twitch_rtmp_urls[i],
                                                //callback
                                                function(data) {
                                                    if(data.status === 200) {
                                                        //update the video status
                                                        VIDEO.updateOne({video_id: video_ids[i]}, {$set: {
                                                            status: "Streamed",
                                                            twitch_rtmp_url: "",
                                                            scheduled: false,
                                                        }}, (err, data) => {
                                                            if(err) {
                                                                console.log(err);
                                                            } else {
                                                                console.log("twitch stream completed");
                                                            }
                                                        })
                                                    }
                                                });

                                                twitch_streams.push(stream_video_twitch);  //push the stream to the array
                                        }

                                    }
                                }
                            }
                       
                            //wait for all the streams to complete
                            await Promise.all(facebook_streams);
                            await Promise.all(youtube_streams);
                            await Promise.all(twitch_streams);
    
                            
                        }else{
                            console.log(difference,"not yet");
                            console.log("No videos to stream");
                            
                        }
                    }
                }
            }
          
    }catch (err) {
        console.log(err);
    
        }
    }
);


}