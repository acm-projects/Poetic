const db = require("../models");
const Poem = db.poems;

// Create and save a Poem
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Contents cannot be empty. "});
        return;
    }

    // Create a Poem
    const poem = new Poem({
        title: req.body.title,
        author: req.body.author,
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
exports.findAll = (req, res) => {
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
exports.findOne = (req, res) => {
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
