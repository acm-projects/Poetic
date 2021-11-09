module.exports = app => {
    const poemController = require("../controllers/poem.controller.js");

    const router = require("express").Router();

    // POST path to create a poem (user must be logged in)
    router.post("/", /* isAuthenticated, */poemController.createPoem);

    // GET path to find all poems
    router.get("/", poemController.findAllPoems);

    // GET path to find all completed poems
    router.get("/completed", poemController.findAllCompletedPoems);

    // GET path to find all in progress poems
    router.get("/in_progress", poemController.findAllInProgressPoems);

    // GET path to find a specific poem by id
    router.get("/:id", poemController.findPoemById);

    // GET path to find a list of all poems associated with a user by username
    router.get("/user/:username", poemController.findPoemsByUsername);

    // POST path to find all the poems by a bunch of tags
    router.post("/tags", poemController.findPoemsByTags);

    app.use("/api/poems", router)
}

/*
function isAuthenticated(req,res,done) {
    if(req.user) {
        console.log(req.user);
        return done();
    }
    return res.status(401).send("Error: not logged in.");
}
*/