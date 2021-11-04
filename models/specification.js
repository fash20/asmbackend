const mongoose = require('mongoose')


const specificationSchema = mongoose.Schema({
    model: {
        type: String,
        unique : true,
        required: true, 
    },
    ram: {
        type: String,
        default:'N/A',
        required: true
    },
    processor: {
        type: String,
        default:'N/A'
    },
    storage: {
        type: String,
        default:'N/A'
    },
    other: {
        type: String,
        default:'N/A'
    },

})

const Specification = mongoose.model('Specification', specificationSchema)

module.exports = Specification