"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(require("jsonwebtoken"));
function name(req, res, next) {
    const { authorization } = req.headers;
    const rawToken = authorization.split(" ");
    try {
        jsonwebtoken_1.default.verify(rawToken[1], process.env.jwtSecret, (error, data) => {
            if (error) {
                return res.status(400).json({
                    status: "fail",
                    status_code: 102,
                    message: "Invalid token",
                });
            }
            req.user = data.user;
            return next();
        });
    }
    catch (error) {
        if (error) {
            return res.status(400).json({
                status: "fail",
                status_code: 102,
                message: "Invalid token",
            });
        }
    }
}
exports.default = name;
//# sourceMappingURL=ensureAuth.js.map