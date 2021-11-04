const db = require("../models");

const User = db.users;

/**
 * @param req
 * @param res
 */
exports.logout = (req, res) => {
    req.logout();
    console.log("Logged out");
    res.send("Logged out");
}

/**
 * @param req
 * @param {string} req.body.username
 * @param {string} req.body.password
 * @param {string[]} req.body.tags
 * @param {string[]} req.body.poems
 * @param res
 * @param done
 */
exports.register = (req, res, done) => {
    db.users.findOne( { username:req.body.username },
        (err,user) => {
            if(err) {
                res.send({ message: "Error checking for that username already exists." });
                done(null, false);
            } else if(user) {
                res.send({ message: "user " + user.username + " already exists." });
            } else {
                const user = new User({
                    username: req.body.username,
                    password: req.body.password,
                    tags: req.body.tags,
                    poems: req.body.poems
                });
                User.create(user,(err,user)=>{
                    if(err) {
                        console.log("Error creating the new user.");
                        res.send({ message: "Error creating the new user." });
                        done(null,false);
                    } else {
                        console.log("User created:" + user);
                        res.send({ message: "User created.", user: user });
                        done(null,user);
                    }
                });
        }
    });
}