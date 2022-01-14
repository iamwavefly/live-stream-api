"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User_1 = (0, tslib_1.__importDefault)(require("../models/User"));
module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.googleClientId,
        clientSecret: process.env.googleClientSecret,
        callbackURL: "/api/user/auth/google/callback",
        passReqToCallback: true,
    }, (request, accessToken, refreshToken, profile, done) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        var _a;
        const newUser = {
            auth_id: profile.id,
            auth_type: "google",
            fullname: profile === null || profile === void 0 ? void 0 : profile.displayName,
            image: (_a = profile === null || profile === void 0 ? void 0 : profile.photos[0]) === null || _a === void 0 ? void 0 : _a.value,
            email: profile === null || profile === void 0 ? void 0 : profile.emails[0].value,
        };
        try {
            let user = yield User_1.default.findOne({ auth_id: profile.id });
            if (user) {
                done(null, user);
            }
            else {
                user = yield User_1.default.create(newUser);
                done(null, user);
            }
        }
        catch (err) {
            console.error(err);
        }
    })));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User_1.default.findById(id, (err, user) => done(err, user));
    });
};
//# sourceMappingURL=passport.js.map