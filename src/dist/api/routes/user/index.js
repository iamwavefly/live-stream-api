"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/user/");
const router = (0, express_1.Router)();
//get all user
router.get("/", user_1.all);
//get single user
router.get("/:id", user_1.user);
exports.default = router;
//# sourceMappingURL=index.js.map