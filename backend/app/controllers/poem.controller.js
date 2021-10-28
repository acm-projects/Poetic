const db = require("../models");
const Poem = db.poems;
const User = db.users;

/**
 * @param req
 * @param {string} req.body.title
 * @param {string[]} req.body.authors
 * @param {string[]} req.body.tags
 * @param {string} req.body.body
 * @param res
 */
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
        .save()
        .then(data => {
            console.log("Poem saving returned: " + data);

            poem.authors.forEach(authorUsername => {
                User.update(
                    { username: authorUsername },
                    { $push: poem.title }
                ).then(data => {
                    console.log("User updating returned: " + data);
                }).catch(err => {
                    console.log("Error occurred during user update: " + err);
                });
            });

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Poem."
            });
        });
}

/**
 * @param req
 * @param res
 */
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

/**
 * @param req
 * @param req.params.id
 * @param res
 */
// Find a single Poem with an id
exports.findPoemById = (req, res) => {
    const id = req.params.id;

    Poem.findById(id)
        .then(data => {
            if (!data) {
                console.log("No poem found with id " + id);
                res.status(404).send({ message: "No poem found with id " + id });
            } else {
                console.log(data);
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Error retrieving Poem with id=" + id });
        });
};

/**
 * @param req
 * @param {string} req.params.username
 * @param res
 */
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
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving user by username."
            });
        });
}