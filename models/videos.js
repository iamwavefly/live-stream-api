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
    }, { timestamps: true });

    const Video = mongoose.model("video", schema);
    return Video;
};