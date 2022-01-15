"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User_1 = (0, tslib_1.__importDefault)(require("../models/User"));
module.exports = function (passport) {
    // google auth
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
    // facebook auth
    passport.use(new FacebookStrategy({
        clientID: process.env.facebookClientId,
        clientSecret: process.env.facebookClientSecret,
        callbackURL: "/api/user/auth/facebook/callback",
        passReqToCallback: true,
    }, (request, accessToken, refreshToken, profile, done) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        var _b;
        const newUser = {
            auth_id: profile === null || profile === void 0 ? void 0 : profile.id,
            auth_type: "facebook",
            fullname: profile === null || profile === void 0 ? void 0 : profile.displayName,
            image: (profile === null || profile === void 0 ? void 0 : profile.photos) && ((_b = profile === null || profile === void 0 ? void 0 : profile.photos[0]) === null || _b === void 0 ? void 0 : _b.value),
            email: (profile === null || profile === void 0 ? void 0 : profile.emails) && (profile === null || profile === void 0 ? void 0 : profile.emails[0].value),
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
    // linkedin auth
    passport.use(new LinkedInStrategy({
        clientID: process.env.linkedinClientId,
        clientSecret: process.env.linkedinClientSecret,
        callbackURL: "/api/user/auth/linkedin/callback",
        passReqToCallback: true,
        scope: ["r_emailaddress", "r_liteprofile"],
        state: true,
    }, (req, accessToken, refreshToken, profile, done) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        process.nextTick(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            var _c;
            const newUser = {
                auth_id: profile === null || profile === void 0 ? void 0 : profile.id,
                auth_type: "linkedin",
                fullname: profile === null || profile === void 0 ? void 0 : profile.displayName,
                image: (profile === null || profile === void 0 ? void 0 : profile.photos) ? (_c = profile === null || profile === void 0 ? void 0 : profile.photos[0]) === null || _c === void 0 ? void 0 : _c.value : "",
                email: (profile === null || profile === void 0 ? void 0 : profile.emails) ? profile === null || profile === void 0 ? void 0 : profile.emails[0].value : "",
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
        }));
    })));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User_1.default.findById(id, (err, user) => done(err, user));
    });
};
//# sourceMappingURL=passport.js.map