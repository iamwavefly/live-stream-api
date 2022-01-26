const dateUtil = require('date-fns');
const functions = require("../utility/function.js")
var uniqueValidator = require('mongoose-unique-validator');

module.exports = mongoose => {
  let schema = mongoose.Schema({
        token: { 
            type: String,
            required: true,
            index: true
        },
        photo: { 
            type: String,
            default: ""
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
        },
        phone: {
            type: String,
            default: "",
            match: [/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g, 'The phone number entered is invalid, check and retry.'],
            index: true
        },
        account_type: {
            type: String,
            default: "free account",
            enum: ["paid account"],
            index: true
        },
        country: {
            type: String,
            default: ""
        },
        verification_code: {
            type: Number
        },
        auth_method: {
            type: String,
            default: "local"
        },
        is_verified: {
            type: Boolean,
            default: false
        },
        is_registered: {
            type: Boolean,
            default: false
        },
        is_blocked: {
            type: Boolean,
            default: false
        },
        token_expiry: { 
            type: String,
            default: dateUtil.addMinutes(new Date(), process.env.TOKEN_EXPIRY_MINUTES).toISOString()
        }
    }, { timestamps: true });

    schema.plugin(uniqueValidator, {message: 'This email address is already taken, Try another one.'});
    const User = mongoose.model("user", schema);
    return User;
};