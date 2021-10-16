/* Load order model */
const interest = require('../models/interest');
var Interest = require('../models/interest');

const generateID = async (req) => {
    const idList = await Interest.find(req.query).select("-_id interestID").exec();
    idList.sort();
    console.log(idList)
    if (idList.length === 0) {
        return 100
    } else {
        const nextId = idList[idList.length - 1]['interestID'] + 1
        return nextId
    }
}

exports.interestCreatePost = async function (req, res) {

    let interestInfo = req.body

    interestInfo.interestID = await generateID(req)
    console.log(interestInfo)

    const interest = new Interest(interestInfo);
    interest.save((err, postInfo) => {
        if (err) {
            res.status(400).json({ success: false, err });
        } else {
            res.status(200).json({ success: true, postInfo });
        }
    });
};

exports.interestListGet = function (req, res) {
    Interest.find(req.query).then((interest) => {
        if (interest.length == 0) {
            res.status(404).json({ success: false, errMessage: "no order found" })
        } else {
            res.status(200).json({ success: true, allInterest: interest })
        }
    })
}

exports.interestUpdatePost = function (req, res) {
    Interest.findOneAndUpdate(
        req.query,
        req.body,
        { new: true },
        function (err, updatedInterest) {
            if (err) {
                res.status(404).json({ success: false, err });
            } else {
                res.status(200).json({ success: true, updatedInterest: updatedInterest });
            }
        }
    );
};