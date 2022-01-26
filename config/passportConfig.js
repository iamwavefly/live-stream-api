const dateUtil = require('date-fns');
const path = require("path");
const functions = require("../utility/function.js")

const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

const db = require("../models");
const USER = db.user;

module.exports = function (passport) {  // passport is a global variable
    passport.use(new GoogleStrategy( {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: "/api/user/auth/google/callback",
        callbackURL: "/authentication/auth/google/callback",
        scope: ['profile', 'email'],
        passReqToCallback: true
    }, async (request, accessToken, refreshToken, profile, done) => {
            
            try {
    
                let user = await USER.findOne({ google_id: profile.id });
                console.log({google_id: profile.id}, "google_id");
    
                if (user) {
                    return done(null, user);
                } else {
                    user = await USER.create({
                        google_id: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        auth_method: "google",
                        token: functions.uniqueId(30, "alphanumeric"),
                        password: "",
                        is_verified: true,
                        is_blocked: false,
                        is_registered: true,
                        
                    });
                    return done(null, user);
                }
    
            } catch (error) {
                return done(error, false, error.message);
            }
    
        }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        USER.findById(id, function (err, user) {
            done(err, user);
        });
    });
  
}