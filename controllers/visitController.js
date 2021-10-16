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

exports.visitListGet = function (req, res) {
    Visit.find(req.query).exec((err, visits) => {
        if (err) {
            res.status(404).json({ success: false, err })
        } else {
            res.status(200).json({ success: true, visits: visits })
        }
    })
};

exports.visitUpdatePost = function (req, res) {
    Visit.findOneAndUpdate(
        req.query,
        req.body,
        { new: true },
        function (err, updatedVisit) {
            if (err) {
                res.status(404).json({ success: false, err });
            } else {
                res.status(200).json({ success: true, updatedVisit: updatedVisit });
            }
        }
    );
};