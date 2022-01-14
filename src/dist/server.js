"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const swagger_ui_express_1 = (0, tslib_1.__importDefault)(require("swagger-ui-express"));
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const morgan_1 = (0, tslib_1.__importDefault)(require("morgan"));
const config_json_1 = (0, tslib_1.__importDefault)(require("./docs/config.json"));
const user_1 = (0, tslib_1.__importDefault)(require("./api/routes/user/"));
const stream_1 = (0, tslib_1.__importDefault)(require("./api/routes/stream"));
const mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
const express_session_1 = (0, tslib_1.__importDefault)(require("express-session"));
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
const dotenv = (0, tslib_1.__importStar)(require("dotenv"));
const app = (0, express_1.default)();
// config environment vars
dotenv.config();
// passport configuration
require("./config/passport")(passport_1.default);
// Body parsing Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// DB Config
const db = require("./config/db").mongoURI;
// Connect to MongoDB
mongoose_1.default
    .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
// Sessions
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
}));
// Set global var
app.use((req, res, next) => {
    res.locals.user = req["user"] || null;
    next();
});
// Passport middleware
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("/", (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    res.status(200).send({
        message: "Live sumo API index",
    });
}));
// user routes
app.use("/api/user", user_1.default);
// stream routes
app.use("/api/stream", stream_1.default);
// swagger setup
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(config_json_1.default));
// create port server
const port = process.env.PORT || 4000;
try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
}
catch (error) {
    console.error(`Error occurred: ${error === null || error === void 0 ? void 0 : error.message}`);
}
//# sourceMappingURL=server.js.map