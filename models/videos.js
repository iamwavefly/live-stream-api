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
        author: { 
            type: String
        },
        name: { 
            type: String
        },
        size: {
            type: Number,
            default: 0
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
        stream_date:{
            type: Date,
            default: Date.now
        },
        stream_time:{
            type: String,
            default: ""
        },
        is_scheduled:{
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: "Queued",
            enum: ["Queued", "Scheduled", "InProgress", "Streamed", "failed"],
        },
    }, { timestamps: true });

    const Video = mongoose.model("video", schema);
    return Video;
};