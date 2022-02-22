const dateUtil = require('date-fns');
const functions = require("../utility/function.js")

module.exports = mongoose => {
  let schema = mongoose.Schema({
        video_id: { 
            type: String,
            required: true
        },
        token: { 
            type: String,
            required: true
        },
        scheduled_by: { 
            type: String
        },
        name: { 
            type: String
        },
        size: {
            type: Number,
            default: 0
        },
        thumbnail: {
            type: String
        },
        duration: {
            type: Number,
            default: 0
        },
        url: {
            type: String,
            default: ""
        },
        title:{
            type: String,
            default: ""
        },
        description:{
            type: String,
            default: ""
        },
        tags:{
            type: String,
            default: ""
        },
        date:{
            type: String,
            default: ""
        },
        time:{
            type: String,
            default: ""
        },
        scheduled_start_times:{
            type: String,
            default: ""
        },
        is_scheduled:{
            type: Boolean,
            default: false
        },
        is_facebook:{
            type: Boolean,
            default: false
        },
        is_twitter:{
            type: Boolean,
            default: false
        },
        is_instagram:{
            type: Boolean,
            default: false
        },
        is_youtube:{
            type: Boolean,
            default: false
        },
        is_twitch:{
            type: Boolean,
            default: false
        },
        youtube_rtmp_url:{
            type: String,
            default: ""
        },
        facebook_rtmp_url:{
            type: String,
            default: ""
        },
        twitter_rtmp_url:{
            type: String,
            default: ""
        },
        instagram_rtmp_url:{
            type: String,
            default: ""
        },
        twitch_rtmp_url:{
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "Queued",
            enum: ["Queued", "Scheduled", "Streaming", "Streamed", "Failed"],
        },
    }, { timestamps: true });

    const Video = mongoose.model("video", schema);
    return Video;
};