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
        url: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "queued",
            enum: ["queued", "InProgress", "Streamed", "failed"],
        },
        size: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 0
        },
    }, { timestamps: true });

    const Video = mongoose.model("video", schema);
    return Video;
};