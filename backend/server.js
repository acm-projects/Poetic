const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
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

app.use(cookieParser());
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

// set port, listen for requests
const PORT = 8081;

var http = require('http').createServer(app);
var io = require('socket.io')(http, { cors: { origin: '*', methods: ['GET', 'POST'] } });

var roomInfo = {};

io.on('connection', function(socket, data) {
    const poemTitle = socket.request._query["poemTitle"];
    console.log('Client connected with data:', poemTitle);

    console.log("about to emit initial value: ", roomInfo[poemTitle] ? roomInfo[poemTitle] : null);
    socket.emit('initial value', roomInfo[poemTitle] ? roomInfo[poemTitle] : null);

    socket.join(poemTitle);

    socket.on('about to disconnect', () => {
        console.log('about to disconnect');
        console.log('roomInfo before disconnect=', roomInfo);
        if (io.sockets.adapter.rooms.get(poemTitle).size <= 1) {
            delete roomInfo[poemTitle];
        }
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        console.log('roomInfo after disconnect=', roomInfo);
    });

    socket.on('editor change', (event) => {
        console.log("Received a text change", event);
        console.log(roomInfo[poemTitle])
        roomInfo[poemTitle] = roomInfo[poemTitle] ? { contentState: event, title: roomInfo[poemTitle].title } : { contentState: event, title: null };
        socket.to(poemTitle).emit('editor change', event);
    });

    socket.on('title change', (event) => {
        console.log("received a title change", event);

        roomInfo[poemTitle] = roomInfo[poemTitle] ? { contentState: roomInfo[poemTitle].contentState, title: event } : { contentState: null, title: event };

        console.log(roomInfo[poemTitle]);

        socket.to(poemTitle).emit('title change', event);
    })

    socket.on('editor and title change', (event => {
        console.log("received editor and title change", event);

        roomInfo[poemTitle] = event;

        console.log(roomInfo[poemTitle]);
    }))
});

io.on('disconnect', (event) => {
    console.log('Some people left.');
})

http.listen(PORT, function() {
    var host = http.address().address
    var port = http.address().port
    console.log('App listening at http://%s:%s', host, port)
});