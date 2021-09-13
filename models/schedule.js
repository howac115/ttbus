const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    interestId: {
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
        type: Boolean
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
    reasonForCancellation: {
        type: String
    }
});


module.exports = mongoose.model("Schedule", ScheduleSchema);