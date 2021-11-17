module.exports = app => {
    const userController = require("../controllers/user.controller.js");

    const router = require("express").Router();

    // GET path to find a list of all the users in the database
    router.get("/", userController.findAllUsers);

    // GET path to find a list of all the users associated with a poem
    router.get("/poem/:id", userController.findByPoemId);

    // GET path to find a specific user by their username
    router.get("/username/:username", userController.findByUsername);

    // POST path to get the compatibility score between the user logged in and a user found from the username
    router.post("/compatibility/:username", isAuthenticated, userController.getCompatibility);

    // POST path to get all users sorted by their compatibility with the user logged in
    router.post("/compatibility_all", userController.findUsersSortedByCompatibility);

    app.use("/api/users", router)
}

// Checking if the request has a user that is authenticated or not.
function isAuthenticated(req,res,next) {
    if(req.user) {
        console.log(req.user);
        return next;
    }
    return res.status(401).send("Error: not logged in.");
}