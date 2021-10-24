const db = require("../models");

const User = db.users;

/**
 * @param req
 * @param res
 */
exports.logout = (req, res) => {
    req.logout();
    res.send("Logged out");
}

/**
 * @param req
 * @param req.user
 * @param res
 */
exports.postLogin = (req, res) => {
    res.json(req.user);
}

/**
 * @param req
 * @param {string} req.body.username
 * @param {string} req.body.password
 * @param {string[]} req.body.tags
 * @param {string[]} req.body.poems
 * @param res
 */
exports.register = (req, res) => {
    db.users.findOne( { username:req.body.username },
        (err,user) => {
            if(err) {
                done(null, false);
            } else if(user) {
                res.redirect("/")
            } else {
                const user = new User({
                    username: req.body.username,
                    password: req.body.password,
                    tags: req.body.tags,
                    poems: req.body.poems
                });
                User.create(user,(err,user)=>{
                    if(err) {
                        done(null,false);
                    } else {
                        done(null,user);
                    }
                });
        }
    });
}