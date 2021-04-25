const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    otherFields: Array,
    contactPerson: {
        name: String,
        email: {
            type: String,
            unique: true
        },
        telephone: Number,
        otherFields: Array,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Department", departmentSchema)