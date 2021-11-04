const mongoose = require('mongoose')


const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique : true
    },
    group:{
        type: String,
        required: true,
    },
    count:{
        type: Number,
        default:0,
        min: 0
    }
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category
