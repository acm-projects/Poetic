module.exports = app => {
    const db = require("../models");

    const loginController = require("../controllers/authentication.controller.js");

    const router = require("express").Router();

    router.get("/user", (req, res) => {
        res.send(req.user);
    });

    // GET path to logout
    router.get("/logout", (req, res) => {
        req.logout();
        res.send("success");
    });

    // POST path to login
    router.post("/login",db.passport.authenticate('local'), (req, res) => {
        res.send("success");
    });

    // POST path to register a user
    router.post("/register", loginController.register, db.passport.authenticate('local'), (req, res) => {
        res.send("success");
    });

    app.use("/api/authentication", router)
}