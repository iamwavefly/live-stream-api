const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');
const helmet = require('helmet')
const cors = require('cors');
var cluster = require('cluster');
var passport = require ("passport");
var session = require ("express-session");
const redis = require('redis');

//bring in the passport config
require('./config/passportConfig')(passport);

// DATABASE
const db = require("./models/index.js");
db.mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

// APP ENVIRONMENT
process.env.NODE_ENV = process.env.MODE;
if (process.env.MODE.toLowerCase() == "production") {
    process.on('uncaughtException', function (err) {
        console.error((new Date).toUTCString() + ' uncaughtException error:', err.message)
        process.exit(0)
    })
}

const app = express()
app.use(helmet())
app.use(cors());

//passport
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.session());
app.use(passport.initialize());



app.use(function(req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src *; font-src 'self' http://* 'unsafe-inline'; img-src 'self' https: http: data: blob:; script-src 'self' * 'unsafe-inline' 'unsafe-eval'; style-src 'self' * 'unsafe-inline'; frame-src 'self' https: http: data: blob:; media-src 'self' https: http: data: blob:"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({
    limit: '700000000000gb'
}));

app.use(bodyParser.urlencoded({
    limit: '700000000000gb',
    parameterLimit: 100000000000,
    extended: true
}));

//STATIC
app.use('/media', express.static('media'))

// connect to redis
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

console.log(`Running in ${process.env.MODE} mode`);


// client.on('error', function (err) {
//     console.log('Error ' + err);
// });


// ROUTES

// AUTHENTICATION
const login = require('./routes/authentication/login')
const signup = require('./routes/authentication/signup')
const resend_code = require('./routes/authentication/resend_code')
const reset_password = require('./routes/authentication/reset_password')
const verify_code = require('./routes/authentication/verify_code')
const google_auth = require('./routes/authentication/google_auth')
login(app)
signup(app)
resend_code(app)
reset_password(app)
verify_code(app)
google_auth(app)

// ACCOUNT
const get_user = require('./routes/account/get_user')
const edit_user = require('./routes/account/edit_user')
const change_password = require('./routes/account/change_password')
const upload_photo = require('./routes/account/upload_photo')
get_user(app)
edit_user(app)
change_password(app)
upload_photo(app)

// VIDEO
const upload_video = require('./routes/video/upload_video')
const edit_video = require('./routes/video/edit_video')
const delete_video = require('./routes/video/delete_video')
const get_videos = require('./routes/video/get_videos')
const schedule_video = require('./routes/video/schedule_video')
const get_scheduled_video = require('./routes/video/get_scheduled_video')
upload_video(app)
edit_video(app)
delete_video(app)
get_videos(app)
schedule_video(app)
get_scheduled_video(app)


// TEAM
const create_team = require('./routes/team/create_team')
const edit_team = require('./routes/team/edit_team')
const delete_team = require('./routes/team/delete_team')
const get_teams = require('./routes/team/get_teams')
create_team(app)
edit_team(app)
delete_team(app)
get_teams(app)

// Countries
const get_countries = require('./routes/countries/get_countries')
get_countries(app)


app.get("/", (req, res) => {
  res.status(200).json({ "status": 200, "message": "Welcome to live snap api.", "data": null })
});

// 404
app.get('*', function (req, res) {
    res.status(400).json({ "status": 400, "message": "You seem to be lost in this wide and bountiful internet.", "data": null })
});

// SERVER
const setupServer = () => {
    const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;
    var PORT = process.env.PORT

    if (cluster.isMaster) {
        for (var i = 0; i < CONCURRENCY; i++) {
            cluster.fork();
        }

        cluster.on('exit', function () {
            if (process.env.MODE == 'production') {
                cluster.fork();
            }
        });

    } else {
        http.createServer(app).listen(PORT, () => console.log(`Listening on ${PORT}`));
    }
};

setupServer();