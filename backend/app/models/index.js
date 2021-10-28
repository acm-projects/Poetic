const dbConfig = require("../config/db.config.js");

const passport = require("passport");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.passport = passport;
db.url = dbConfig.url;
db.poems = require("./poem.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);

module.exports = db;