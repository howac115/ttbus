var Visit = require('../models/visit');

exports.visitCreatePost = function (req, res) {
    Visit.findOne(req.body).then((visit) => {
        if (visit) {
            res.status(409).json({ error: 'You have that visit already!' });
        } else {
            const visit = new Visit(req.body);
            visit.save((err, postInfo) => {
                if (err) {
                    res.status(400).json({ success: false, err });
                } else {
                    res.status(200).json({ success: true, postInfo });
                }
            });
        }
    });
};

exports.visitListGet = function (req, res) { // here even though req is not used, it is there for making res as response, otherwise res will be request
    Visit.find().exec((err, visits) => {
        if (err) {
            res.status(404).json({ success: false, err })
        } else {
            res.status(200).json({ success: true, visits: visits })
        }
    })
};

exports.visitDetailGet = function (req, res) {
    Visit.findById(req.params.id, function (err, visit) {
        if (visit) {
            res.status(200).json({ success: true, visit: visit })
        } else {
            res.status(404).json({ success: false, message: err })
        }
    })
};