const bcrypt = require('bcryptjs');

/* Load customer model */
var User = require('../models/user');

// POST request to handle register
exports.userRegisterPost = function (req, res) {

    const { schoolName, schoolContactName, schoolContactNumber, email, password } = req.body;

    User.findOne({ email: email }).then((user) => {
        if (user) {
            res.status(409).json({ error: 'Email already exists' });
        } else {
            const newUser = new User({
                schoolName,
                schoolContactName,
                schoolContactNumber,
                email,
                password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then((user) => {
                        res.json({
                            user: {
                                id: user.id,
                                schoolName: user.schoolName,
                                schoolContactName: user.schoolContactName,
                                schoolContactNumber: user.schoolContactNumber,
                                email: user.email,
                                password: user.password
                            },
                        });
                    });
                });
            });
        }
    });
};

exports.userLoginPost = function (req, res) {
    const { email, password } = req.body;
    // Match customer
    User.findOne({
        email: email,
    }).then((user) => {
        if (!user) {
            res.status(404).json({ success: false, error: 'Email not registered' });
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    res.status(200).json({
                        success: true,
                        user: {
                            id: user.id,
                            email: user.email,
                            admin: user.admin,
                            schoolName: user.schoolName
                        },
                    });
                } else {
                    res.status(409).json({ error: err, message: 'password incorrect' });
                }
            })
        }
    })
}