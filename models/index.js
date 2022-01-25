const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

let username = 'LiveSumo';
let password = 'w65HMDvQTVoBJ073';
let database = 'live-sumo-cluster';
let collection = 'Live-snap-db'

const db_url = `mongodb+srv://${username}:${password}@${database}.bbtvv.mongodb.net/${collection}?retryWrites=true&w=majority`

const db = {};
db.mongoose = mongoose;
db.url = db_url;

// set the model
db.user = require("../models/users")(mongoose);
module.exports = db;