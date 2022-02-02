const dateUtil = require('date-fns');
const functions = require("../utility/function.js")

module.exports = mongoose => {
  let schema = mongoose.Schema({
        team_id: { 
            type: String,
            required: true
        },
        token: { 
            type: String,
            required: true
        },
        name: { 
            type: String,
            required: true,
            match: [/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u, 'The name entered is invalid, check and retry.'],
            index: true
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "The email address can't be blank, check and retry"],
            match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'The email address entered is invalid, check and retry.'],
            index: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }, { timestamps: true });

    const Team = mongoose.model("team", schema);
    return Team;
};