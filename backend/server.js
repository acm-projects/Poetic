const express = require("express");
const cors = require("cors");
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;

const app = express();

var corsOptions = {
    origin: ['http://localhost:8081','http://localhost:3000'],
    credentials: true
};

app.use(express.static("public"));

app.use(cors(corsOptions));

const oneSecond = 1000;
const oneMinute = oneSecond * 60;
const oneHour = oneMinute * 60
const oneDay = oneHour * 24;

app.use(session({
    secret: 'acmpoetic',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: oneDay }
}))

app.use((req, res, next) => {
    console.log(req.method, req.ip, req.path);
    next();
})
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const db = require("./app/models");

app.use(db.passport.initialize());
app.use(db.passport.session());

db.passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username, password);
        db.users.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

db.passport.serializeUser((user,done)=>{
    if(user) {
        return done(null, user.id)
    }
    return done(null,false)
});

db.passport.deserializeUser((id, done) => {
    db.users.findById(id,(err,user)=>{
        if(err) return done(null,false);
        return done(null,user);
    })
});

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// Add all of the routes exported from these routes files
require("./app/routes/poem.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/authentication.routes")(app);

app.get("/user", (req, res) => {
    res.send(req.user);
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});