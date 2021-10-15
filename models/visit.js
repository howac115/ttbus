const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitSchema = new Schema({
    interestID: {
        type: Number
    },
    schoolName: {
        type: String
    },
    schoolType: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    specializedActivities: {
        type: String
    },
    studentsParticipating: {
        type: Number
    },
    costPerStudent: {
        type: Number
    },
    totalCost: {
        type: Number
    },
    message: {
        type: String
    },
    address: {
        type: String
    },
    reasonForCancellation: {
        type: String
    }
});


module.exports = mongoose.model("Visit", VisitSchema);