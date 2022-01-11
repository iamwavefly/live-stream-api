"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidate = void 0;
const tslib_1 = require("tslib");
const joi_1 = (0, tslib_1.__importDefault)(require("joi"));
exports.UserValidate = joi_1.default.object({
    fullname: joi_1.default.string().alphanum().min(3).max(30).required(),
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
    })
        .required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    password2: joi_1.default.ref("password"),
});
//# sourceMappingURL=user.js.map