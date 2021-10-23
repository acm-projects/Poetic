const db = require("../models");

exports.logout = (req, res) => {
    req.logout();
    res.send("Logged out");
}

exports.test = (req, res) => {
    req.session.test ? req.session.test++ : req.session.test=1;
    res.send(req.session.test.toString() + " "+req.user.username);
}

exports.postLogin = (req, res) => {
    res.json(req.user);
}

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
                db.users.create(user,(err,user)=>{
                    if(err) {
                        done(null,false);
                    } else {
                        done(null,user);
                    }
                })
        }
    })
}