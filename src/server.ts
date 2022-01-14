import express, { Application, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import swaggerDocs from "./docs/config.json";
import UserRoute from "./api/routes/user/";
import StreamRoute from "./api/routes/stream";
import mongoose, { ConnectOptions } from "mongoose";
import session from "express-session";
import passport from "passport";
import * as dotenv from "dotenv";

const app: Application = express();
// config environment vars
dotenv.config();
// passport configuration
require("./config/passport")(passport);
// Body parsing Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// DB Config
const db = require("./config/db").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({
    message: "Live sumo API index",
  });
});
// user routes
app.use("/api/user", UserRoute);
// stream routes
app.use("/api/stream", StreamRoute);
// swagger setup
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// create port server
const port = process.env.PORT || 4000;

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error?.message}`);
}
