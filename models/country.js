const mongoose = require('mongoose');

const country_schema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    population: {
        type: Number,
        default: 0
    },
    continent: {
        type: String
    },
    lifeExpectancy: {
        type: Number
    },
    purchasingPower: {
        type: Number
    }
})

module.exports = mongoose.model('Country', country_schema);