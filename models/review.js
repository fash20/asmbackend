const mongoose = require('mongoose')


const reviewSchema = mongoose.Schema({
    asset:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    reviewer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    review:{
        type:String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    Date:{
        type:Date,
        default:Date.now
    },
})

const Review = mongoose.model('Review',reviewSchema)

module.exports = Review