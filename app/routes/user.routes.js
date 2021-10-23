module.exports = app => {
    const userController = require("../controllers/user.controller.js");

    const router = require("express").Router();

    router.get("/", userController.findAllUsers);

    router.get("/poem/:id", userController.findByPoemId);

    router.get("/username/:username", userController.findByUsername);

    router.post("/compatibility/:username", userController.getCompatibility);

    app.use("/api/users", router)
}