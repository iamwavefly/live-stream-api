const GoogleStrategy = require("passport-google-oauth20").Strategy;
import User from "../models/User";

module.exports = function (passport) {
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

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
