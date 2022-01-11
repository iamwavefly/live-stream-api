"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.all = void 0;
const tslib_1 = require("tslib");
const all = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        status: "success",
        status_code: 100,
        message: "Fetch all user"
    });
});
exports.all = all;
const user = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || typeof id === undefined) {
        return res.status(403).json({
            status: "fail",
            status_code: 105,
            message: "Invalid user id passed"
        });
    }
    return res.status(200).json({
        status: "success",
        status_code: 100,
        message: "Fetch user"
    });
});
exports.user = user;
//# sourceMappingURL=index.js.map