module.exports = app => {
    const db = require("../models");

    const loginController = require("../controllers/login.controller.js");

    const router = require("express").Router();

    router.post("/logout", loginController.logout);

    router.get("/test", isAuthenticated, loginController.test);

    router.post("/login",db.passport.authenticate('local'), loginController.postLogin);

    router.post("/register", loginController.register, db.passport.authenticate('local'), loginController.postLogin);

    app.use("/api/login", router)
}

function isAuthenticated(req,res,done) {
    if(req.user) {
        console.log(req.user);
        return done();
    }
    return res.status(401).send("Error: not logged in.");
}