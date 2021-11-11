module.exports = app => {
    const poemController = require("../controllers/poem.controller.js");

    const router = require("express").Router();

    // POST path to create a poem (user must be logged in)
    router.post("/", isAuthenticated, poemController.createPoem);

    // GET path to find all poems
    router.get("/", poemController.findAllPoems);

    // GET path to find all completed poems
    router.get("/completed", poemController.findAllCompletedPoems);

    // GET path to find all in progress poems
    router.get("/in_progress", poemController.findAllInProgressPoems);

    // GET path to find a specific poem by id
    router.get("/:id", poemController.findPoemById);

    router.post("/title", poemController.findPoemByTitle);

    // GET path to find a list of all poems associated with a user by username
    router.get("/user/:username", poemController.findPoemsByUsername);

    // POST path to find all the poems by a bunch of tags
    router.post("/tags", poemController.findPoemsByTags);

    // POST path to update the title and body of a poem
    router.post("/update", poemController.updatePoem)

    // POST path to set the body of a poem
    router.post("/update_body", poemController.updatePoemBody);

    // POST path to set the title of a poem
    router.post("/update_title", poemController.updatePoemTitle);

    app.use("/api/poems", router)
}

function isAuthenticated(req,res,done) {
    if(req.user) {
        console.log(req.user);
        return done();
    }
    return res.status(401).send("Error: not logged in.");
}