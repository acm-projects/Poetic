//stop point: tutorial 12, sessions/middleware in mongodb
// https://www.youtube.com/watch?v=v_Ewns3n_Ow&list=PL2PkZdv6p7Zmu51_FBoNDcv8Bk8bXODvH&index=12

//use 'login' post request, then 'test' get, then 'logout' post
//'register' post request does not work? maybe because 'user' get doesn't return anything?
require('dotenv').config();

const express = require("express");
const logger = require("morgan");
const server = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

mongoose.connect("mongodb://localhost:27017/NewDb", { useNewUrlParser: true});
const userSchema = new Schema({
    username: {type: String, unique:true},
    password: String,
    name: String,
}) 

const User = mongoose.model("User", userSchema);

server.use(session({
    secret: 'acmpoetic',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
server.use(express.static(process.env.STATIC_FOLDER))
server.use(logger());

server.use((req, res, next) => {
    console.log(req.method, req.ip, req.path);
    next();
})
server.use(express.json());
server.use(express.urlencoded({
  extended: true
}));

  server.use(passport.initialize());
  server.use(passport.session());

  passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username, password);
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.password == password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser((user,done)=>{
      if(user) {
        return done(null, user.id)
      }
      return done(null,false)
  });

  passport.deserializeUser((id, done) => {
      User.findById(id,(err,user)=>{
          if(err) return done(null,false);
          return done(null,user);
      })
  })

 //REGISTER
  server.post('/register',
    (req,res,done) => {
        User.findOne({username:req.body.username},(err,user)=> {
            if(err) done(null,false);
            else if(user) res.redirect("/")
            else {
                User.create({username:req.body.username,
                    password:req.body.password},(err,user)=>{
                        if(err) done(null,false)
                        done(null,user)
                    })
            }
        })
    },
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.json(req.user);
  });

  //LOGIN post request
  server.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.json(req.user);
  });

//GET request localhost:8080/user/username=name&password=pass
server.get("/user", (req, res) => {
    let name = req.query.username;
    let password = req.query.password;
    res.json({username:name,password});
})

//POST request localhost:8080/user
server.post("/user", (req, res) => {
    let name = req.body.username;
    let password = req.body.password;
    res.json({username:name,password});
}) 

server.get("/test", isAuthenticated,(req,res)=>{
    req.session.test ? req.session.test++ : req.session.test=1;
    res.send(req.session.test.toString() + " "+req.user.username);
})

//LOGOUT port request
server.post("/logout", (req,res)=>{
    req.logout();
    res.send("Logged out");
})
function isAuthenticated(req,res,done) {
    if(req.user) {
        return done()
    }
    return res.redirect("/")
}
server.listen(process.env.PORT, () => {
    console.log("server started on port ", process.env.PORT);
})