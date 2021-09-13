/* Load snack model */
var Snack = require('../models/snack');


/* create one snack
 * (POST) http://localhost:5000/snack/
 * body = {
 *          "name": "cappucino",
 *          "photo": "https://www.flaticon.com/svg/vstatic/svg/4296/4296606.svg",
 *          "price": ""
 *        }
 */
exports.snackCreatePost = function (req, res) {
    Snack.findOne({
        name: req.body.name
    }).then((snack) => {
        if (snack) {
            res.status(409).json({ error: 'You have that snack already!' });
        } else {
            const snack = new Snack({
                name: req.body.name,
                photo: req.body.photo,
                price: req.body.price
            });
            snack.save((err, postInfo) => {
                if (err) {
                    res.status(400).json({ success: false, err });
                } else {
                    res.status(200).json({ success: true, postInfo });
                }
            });
        }
    });
};

/* view menu of snacks
 * (GET) http://localhost:5000/snack/
 */
exports.snackListGet = function (req, res) { // here even though req is not used, it is there for making res as response, otherwise res will be request
    Snack.find().exec((err, snacks) => {
        if (err) {
            res.status(404).json({ success: false, err })
        } else {
            res.status(200).json({ success: true, snacks: snacks })
        }
    })
};

/* view one snack detail
 * (GET) http://localhost:5000/snack/606af38e9ee631407c7a03da
 */
exports.snackDetailGet = function (req, res) {
    Snack.findById(req.params.id, function (err, snack) {
        if (snack) {
            res.status(200).json({ success: true, snack: snack })
        } else {
            res.status(404).json({ success: false, message: err })
        }
    })
};