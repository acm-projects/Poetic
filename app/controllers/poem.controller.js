const db = require("../models");
const Poem = db.poems;
const User = db.users;

// Create and save a Poem
exports.createPoem = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Contents cannot be empty."});
        return;
    }

    // Create a Poem
    const poem = new Poem({
        title: req.body.title,
        authors: req.body.authors,
        tags: req.body.tags,
        body: req.body.body
    });

    // Save Poem in the database
    poem
        .save(poem)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Poem."
            });
        });
}

// Retrieve all Poems from the database
exports.findAllPoems = (req, res) => {
    Poem.find()
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving poems."
            });
        });
}

// Find a single Poem with an id
exports.findPoemById = (req, res) => {
    const id = req.params.id;

    Poem.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Poem with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Error retrieving Poem with id=" + id });
        });
};

// Find all Poems associated with a user
exports.findPoemsByUsername = (req, res) => {
    const username = req.params.username;

    if (!username) {
        res.status(400).send({ message: "Contents cannot be empty."});
        return;
    }

    User.findOne({ username: username })
        .then(user => {
            if(!user) {
                res.status(404).send({ message: "Did not find User with username " + username });
            } else {
                console.log(user.poems);
                const poems = user.poems;
                Poem.find({ title: { $in: poems } })
                    .then(data => {
                        console.log(data);
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Error retrieving poems by username."
                        });
                    })
            }

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving user by username."
            });
        });
}