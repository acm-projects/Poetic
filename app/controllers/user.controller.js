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

exports.getCompatibility = (req, res) => {
    const conditions = req.body.conditions;
    const allPoemTags = [];
    const username = req.params.username;

    if (!username || !conditions) {
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
                        data.forEach(poem => poem.tags.forEach(tag => allPoemTags.push(tag)));
                        res.send({ "score": compatibilityScore(req.body.user, user, allPoemTags, conditions) });
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

function compatibilityScore(user, potentialUser, allTags, conditions) {
    let compatibility = 0;
    compatibility += proximityValue(user.poems.length, potentialUser.poems.length, conditions.proximityWeight);
    compatibility += matchingTags(user, allTags);
    return compatibility;
}

/**
 * Calculates a score value based on the difference in the number of poems between the user and potential match
 * @param {int} userPoemCount The user's number of poems.
 * @param {int} potentialMatchPoemCount The potential match's number of poems.
 * @param {number} weight The weight of the value, positive if you want the match to have more poems than you,
 *                                                 negative if you want the match to have fewer poems than you.
 * @returns {number} The score.
 */
function proximityValue(userPoemCount, potentialMatchPoemCount, weight) {
    return potentialMatchPoemCount > userPoemCount ? getBaseLog(2, Math.abs(potentialMatchPoemCount - userPoemCount)) * weight :
        potentialMatchPoemCount === userPoemCount ? 0 : getBaseLog(2, Math.abs(potentialMatchPoemCount - userPoemCount)) * -weight;
}

/**
 * Calculates a score value based on the number of matching tags between the user's personal tags and a list of poem tags.
 * @param {User} user The user to test against.
 * @param {string[]} allTags The list of tags (possibly contains duplicates).
 * @returns {number} The score.
 */
function matchingTags(user, allTags) {
    let tagCount = 0;
    allTags.forEach(tag => tagCount += user.tags.includes(tag) ? 1 : 0);
    return tagCount;
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}