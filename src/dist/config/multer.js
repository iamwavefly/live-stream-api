"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const multer_1 = (0, tslib_1.__importDefault)(require("multer"));
// Multer configs
const storage = multer_1.default.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, "");
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
//# sourceMappingURL=multer.js.map