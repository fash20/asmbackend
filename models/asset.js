const mongoose = require('mongoose')


const assetSchema = mongoose.Schema({
    hostname:{
        type:String,
        required: true,
        unique:true
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
    spec:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Specification',
        required: true
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