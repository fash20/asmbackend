const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique : true
    },
    // email:{
    //     type:String,
    //     required: true
    // },
    // department:{
    //     type: String,
    //     required: true
    // },
    password:{
        type:String,
        required: true
    },
    assetCount:{
        type: Number,
        default:0
    }
    
})

const User = mongoose.model('User',userSchema)

module.exports = User