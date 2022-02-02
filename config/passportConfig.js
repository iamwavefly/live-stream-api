const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const db = require("../models");
const USER = db.user;

module.exports = function (passport) {
    passport.use(new GoogleStrategy( {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    }, async (request, accessToken, refreshToken, profile, done) => {
        // try {
        //     let user = await USER.findOne({ googleId: profile.id });
        //     if (user) {
        //         done(null, user);
        //     } else {
        //         let newUser = await USER.create({
        //             googleId: profile.id,
        //             name: profile.displayName,
        //             email: profile.emails[0].value,
        //             token: functions.uniqueId(30, "alphanumeric"),
        //             is_verified: true,
        //             is_registered: true
        //         });
        //         done(null, newUser);
        //     }
        // } catch (error) {
        //     done(error);
        // }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await USER.findById(id);

            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error);
        }
    });
  
}