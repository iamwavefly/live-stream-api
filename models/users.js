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
        google_access_token: {
            type: String,
            default: ''
        },
        google_refresh_token: {
            type: String,
            default: ''
        },
        google_profile_picture: {
            type: String,
            default: ''
        },
        google_profile_name: {
            type: String,
            default: ''
        },
        is_connected_google:{
            type: Boolean,
            default: false
        },
        facebook_access_token: {
            type: String,
            default: ''
        },
        facebook_refresh_token: {
            type: String,
            default: ''
        },
        facebook_profile_picture: {
            type: String,
            default: ''
        },
        facebook_profile_name: {
            type: String,
            default: ''
        },
        is_connected_facebook:{
            type: Boolean,
            default: false
        },
        twitch_access_token: {
            type: String,
            default: ''
        },
        twitch_refresh_token: {
            type: String,
            default: ''
        },
        twitch_profile_picture: {
            type: String,
            default: ''
        },
        twitch_profile_name: {
            type: String,
            default: ''
        },
        twitch_profile_id:{
            type: String,
            default: ''
        },
        is_connected_twitch:{
            type: Boolean,
            default: false
        },
        twitter_access_token: {
            type: String,
            default: ''
        },
        twitter_refresh_token: {
            type: String,
            default: ''
        },
        twitter_profile_picture: {
            type: String,
            default: ''
        },
        twitter_profile_name: {
            type: String,
            default: ''
        },
        is_connected_twitter:{
            type: Boolean,
            default: false
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
            // required: [true, "The email address can't be blank, check and retry"],
            match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'The email address entered is invalid, check and retry.'],
            index: true,
            unique: true
        },
        password: {
            type: String,
        },
        phone: {
            type: String,
            default: "",
            match: [/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g, 'The phone number entered is invalid, check and retry.'],
            index: true
        },
        account_type: {
            type: String,
            default: "Free Account",
            enum: ["Free Account","Paid Account"]
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
        },
        connected_accounts: {
            type: Number,
            default: 0
        }
    }, { timestamps: true });

    schema.plugin(uniqueValidator, {message: 'This email address is already taken, Try another one.'});
    const User = mongoose.model("user", schema);
    return User;
};