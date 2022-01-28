const dateUtil = require('date-fns');
const path = require("path");
const functions = require("../../utility/function.js")
const passport = require("passport");

const db = require("../../models");
const USER = db.user;
 
        

module.exports = function (app) {

    app.get(`/auth/google`, async (request, response) => {
        passport.authenticate('google', { scope: ['profile', 'email'] });
    });
    
    app.get(`/auth/google/callback`, passport.authenticate('google', { 
        
        failureRedirect: 'https://live-snap-front-end.herokuapp.com/login',
        successRedirect: "https://live-snap-front-end.herokuapp.com/dashboard"}),
        
        async (request, response) => {
        let user = await USER.findOne({ googleId: request.user.id });
        if (user) {
            response.redirect('/');
        } else {
            let newUser = await USER.create({
                googleId: request.user.id,
                name: request.user.displayName,
                email: request.user.emails[0].value,
                token: functions.uniqueId(30, "alphanumeric"),
                is_verified: true,
                is_registered: true
            });
            response.redirect('/');
        }
    }

    )}