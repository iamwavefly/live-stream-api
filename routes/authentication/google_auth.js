const dateUtil = require('date-fns');
const path = require("path");
const functions = require("../../utility/function.js")
const passport = require("passport");

const db = require("../../models");
const USER = db.user;


module.exports = function (app) {

    app.get(`/auth/google`, async (request, response) => {
        passport.authenticate('google', { scope: ['profile', 'email'] })(request, response);
    });
    
    app.get(`/auth/google/callback`, passport.authenticate('google', { failureRedirect: '/login' }), async (request, response) => {
        let user = request.user;
        let payload = {
            is_verified: false,
            is_blocked: false,
            is_registered: false
        }
        let userExists = await USER.find({ email: user.email })
        if (!functions.empty(userExists)) {
            payload["is_registered"] = functions.stringToBoolean(userExists.is_registered)
            throw new Error("This email address has been registered already, try another email address.")
        } else {
            let verification_code = functions.uniqueId(6, "number");
            let user = await USER.create({
                name: user.name,
                email: user.email,
                password: "",
                is_verified: false,
                is_blocked: false,
                is_registered: true,
                verification_code: verification_code,
                created_at: dateUtil.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
                updated_at: dateUtil.format(new Date(), "YYYY-MM-DD HH:mm:ss")
            })
            payload["is_registered"] = functions.stringToBoolean(user.is_registered)
            payload["is_verified"] = functions.stringToBoolean(user.is_verified)
            payload["is_blocked"] = functions.stringToBoolean(user.is_blocked)
        }
        response.status(200).json({ "status": 200, "message": "Successfully logged in.", "data": payload });
    });
}