"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const ensureAuth_1 = (0, tslib_1.__importDefault)(require("../../../middlewares/ensureAuth"));
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
const user_1 = require("../../controllers/user/");
const router = (0, express_1.Router)();
//get all user
router.get("/", user_1.all);
//get single user
router.get("/me", ensureAuth_1.default, user_1.user);
// new user
router.post("/new", user_1.newUser);
// login user
router.post("/login", user_1.loginUser);
// google init login
router.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// google callback
router.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "https://live-snap-front-end.herokuapp.com/login",
}), (req, res) => {
    const user = req.user;
    const { auth_id } = user;
    res
        .status(201)
        .redirect(`https://live-snap-front-end.herokuapp.com/login/social/?auth_id=${auth_id}/`);
});
// facebook init login
router.get("/auth/facebook", passport_1.default.authenticate("facebook"));
// facebook callback
router.get("/auth/facebook/callback", passport_1.default.authenticate("facebook", {
    failureRedirect: "https://live-snap-front-end.herokuapp.com/login",
}), (req, res) => {
    const user = req.user;
    const { auth_id } = user;
    res
        .status(201)
        .redirect(`https://live-snap-front-end.herokuapp.com/login/social/?auth_id=${auth_id}/`);
});
// linkedin init login
router.get("/auth/linkedin", passport_1.default.authenticate("linkedin"));
// linkedin callback
router.get("/auth/linkedin/callback", passport_1.default.authenticate("linkedin", {
    failureRedirect: "https://live-snap-front-end.herokuapp.com/login",
}), (req, res) => {
    const user = req.user;
    const { auth_id } = user;
    res
        .status(201)
        .redirect(`https://live-snap-front-end.herokuapp.com/login/social/?auth_id=${auth_id}/`);
});
// verify user social login
router.post("/auth/verify", user_1.verifySocialAuthent);
// login user
router.put("/update", ensureAuth_1.default, user_1.updateUser);
// login user password
router.put("/update/password", ensureAuth_1.default, user_1.updateUserPassword);
exports.default = router;
//# sourceMappingURL=index.js.map