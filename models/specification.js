const mongoose = require('mongoose')


const specificationSchema = mongoose.Schema({
    ram: {
        type: String,
        default:'N/A'
    },
    storage: {
        type: String,
        default:'N/A'
    },
    processor: {
        type: String,
        default:'N/A'
    },
    product: {
        type: String,
        required: true
    },
    other: {
        type: String,
        default:'N/A'
    },

})

const Specification = mongoose.model('Specification', specificationSchema)

module.exports = specification