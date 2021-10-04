module.exports = app => {
    const poemController = require("../controllers/poem.controller.js");

    const router = require("express").Router();

    router.post("/", poemController.createPoem);

    router.get("/", poemController.findAllPoems);

    router.get("/:id", poemController.findPoemById);

    router.get("/user/:username", poemController.findPoemsByUsername);

    app.use("/api/poems", router)
}