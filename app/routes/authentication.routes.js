module.exports = app => {
    const db = require("../models");

    const loginController = require("../controllers/authentication.controller.js");

    const router = require("express").Router();

    router.post("/logout", loginController.logout);

    router.post("/login",db.passport.authenticate('local'), loginController.postLogin);

    router.post("/register", loginController.register, db.passport.authenticate('local'), loginController.postLogin);

    app.use("/api/authentication", router)
}

function isAuthenticated(req,res,done) {
    if(req.user) {
        console.log(req.user);
        return done();
    }
    return res.status(401).send("Error: not logged in.");
}