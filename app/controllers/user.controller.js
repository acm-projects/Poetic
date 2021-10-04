const db = require("../models");
const User = db.users;
const Poem = db.poems;

// Create and save a User
exports.createUser = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({ message: "Contents cannot be empty. "});
        return;
    }

    // Create a User
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        tags: req.body.tags,
        poems: req.body.poems
    });

    // Save User in the database
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
}

exports.findAllUsers = (req, res) => {
    User.find()
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving all users."
            });
        });
}

// Find a single User by username
exports.findByUsername = (req, res) => {
    const username = req.params.username;
    // Validate request
    if (!username) {
        res.status(400).send({ message: "Contents cannot be empty."});
        return;
    }

    User.findOne({ username: username })
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user by username."
            });
        });
}

// Find all Users associated with a poem
exports.findByPoemId = (req, res) => {
    const id = req.params.id;
    // Validate request
    if (!id) {
        res.status(400).send({ message: "Contents cannot be empty."});
        return;
    }
    Poem.findById(id)
        .then(poemData => {
            if (!poemData) {
                res.status(404).send({ message: "Did not find Poem with id " + id });
            } else {
                console.log(poemData.authors);
                const authors = poemData.authors;
                User.find({ username: { $in: authors } })
                    .then(data => {
                        console.log(data);
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while retrieving users by Poem ID."
                        });
                    });
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Error retrieving Poem with id=" + id });
        });
}