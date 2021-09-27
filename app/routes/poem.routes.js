module.exports = app => {
    const controller = require("../controllers/poem.controller.js");

    var router = require("express").Router();

    router.post("/", controller.create);

    router.get("/", controller.findAll);

    router.get("/:id", controller.findOne);

    app.use("/api/poems", router)
}