module.exports = app => {
    const userController = require("../controllers/user.controller.js");

    const router = require("express").Router();

    router.post("/", userController.createUser);

    router.get("/", userController.findAllUsers);

    router.get("/poem/:id", userController.findByPoemId);

    router.get("/username/:username", userController.findByUsername);

    app.use("/api/users", router)
}