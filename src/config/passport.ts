const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

import User from "../models/User";

module.exports = function (passport) {
  // google auth
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.googleClientId,
        clientSecret: process.env.googleClientSecret,
        callbackURL: "/api/user/auth/google/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        const newUser = {
          auth_id: profile.id,
          auth_type: "google",
          fullname: profile?.displayName,
          image: profile?.photos[0]?.value,
          email: profile?.emails[0].value,
        };
        try {
          let user = await User.findOne({ auth_id: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  // facebook auth
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.facebookClientId,
        clientSecret: process.env.facebookClientSecret,
        callbackURL: "/api/user/auth/facebook/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        const newUser = {
          auth_id: profile?.id,
          auth_type: "facebook",
          fullname: profile?.displayName,
          image: profile?.photos && profile?.photos[0]?.value,
          email: profile?.emails && profile?.emails[0].value,
        };
        try {
          let user = await User.findOne({ auth_id: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  // linkedin auth
  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.linkedinClientId,
        clientSecret: process.env.linkedinClientSecret,
        callbackURL: "/api/user/auth/linkedin/callback",
        passReqToCallback: true,
        scope: ["r_emailaddress", "r_liteprofile"],
        state: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        process.nextTick(async () => {
          const newUser = {
            auth_id: profile?.id,
            auth_type: "linkedin",
            fullname: profile?.displayName,
            image: profile?.photos ? profile?.photos[0]?.value : "",
            email: profile?.emails ? profile?.emails[0].value : "",
          };
          try {
            let user = await User.findOne({ auth_id: profile.id });
            if (user) {
              done(null, user);
            } else {
              user = await User.create(newUser);
              done(null, user);
            }
          } catch (err) {
            console.error(err);
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
