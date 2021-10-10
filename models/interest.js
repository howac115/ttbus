const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var InterestSchema = new Schema({
    schoolName: {
        type: String
    },
    schoolEmail: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    postalCode: {
        type: Number
    },
    schoolType: {
        // one of 'hosting school' or 'visiting school' 
        type: String
    },
    secureParking: {
        type: Boolean
    },
    parkingSpaces: {
        type: Number
    },
    openAreas: {
        type: Number
    },
    visitingSchoolName: {
        type: String
    },
    nearestHostSchoolName: {
        type: String
    },
    distanceFromNearestHostSchool: {
        type: Number
    },
    message: {
        type: String
    },
    interestID: {
        type: Number
    }
}, { timestamps: true })

module.exports = mongoose.model("Interest", InterestSchema);