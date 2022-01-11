"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const swagger_ui_express_1 = (0, tslib_1.__importDefault)(require("swagger-ui-express"));
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const morgan_1 = (0, tslib_1.__importDefault)(require("morgan"));
const docs_1 = (0, tslib_1.__importDefault)(require("./docs/"));
const user_1 = (0, tslib_1.__importDefault)(require("./api/routes/user/"));
const app = (0, express_1.default)();
const port = 4000;
// Body parsing Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.get("/", (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    return res.status(200).send({
        message: "Live sumo API index",
    });
}));
app.use("/api/user", user_1.default);
// swagger setup
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default));
// create port server
try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
}
catch (error) {
    console.error(`Error occurred: ${error === null || error === void 0 ? void 0 : error.message}`);
}
//# sourceMappingURL=server.js.map