const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

let username = 'LiveSumo';
let password = 'w65HMDvQTVoBJ073';
let database = 'live-sumo-cluster';
let collection = 'Live-snap-db'

// const db_url = `mongodb+srv://${username}:${password}@${database}.bbtvv.mongodb.net/${collection}?retryWrites=true&w=majority`
const db_url = process.env.MONGO_URI

const db = {};
db.mongoose = mongoose;
db.url = db_url;

// set the model
db.user = require("../models/users")(mongoose);
db.video = require("../models/videos")(mongoose);
db.team = require("../models/teams")(mongoose);
db.accounts = require("../models/accounts")(mongoose);
module.exports = db;

// mongodb+srv://LiveSumo:w65HMDvQTVoBJ073@live-sumo-cluster.bbtvv.mongodb.net/Live-snap-db?retryWrites=true&w=majority