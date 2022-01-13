"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const ensureAuth_1 = (0, tslib_1.__importDefault)(require("../../../middlewares/ensureAuth"));
const user_1 = require("../../controllers/user/");
const router = (0, express_1.Router)();
//get all user
router.get("/", user_1.all);
//get single user
router.get("/:id", user_1.user);
// new user
router.post("/new", user_1.newUser);
// login user
router.post("/login", user_1.loginUser);
// login user
router.put("/update", ensureAuth_1.default, user_1.updateUser);
// login user password
router.put("/update/password", ensureAuth_1.default, user_1.updateUserPassword);
exports.default = router;
//# sourceMappingURL=index.js.map