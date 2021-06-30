const mongoose = require('mongoose')


const assetSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: true,
    // },
    serialNo:{
        type: String,
        required:'true',
        unique: true
    },
    Model:{
        type: String,
    },
    rating:{
        type: Number
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    specifications:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Spec'
    },
    // report:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Report'
    // },
    date:{
        type: String,
        default: Date
    }
})

const Asset = mongoose.model('Asset',assetSchema)

module.exports = Asset