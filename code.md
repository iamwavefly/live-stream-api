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