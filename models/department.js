const mongoose = require('mongoose');



const departmentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true,
    },
    assets:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Asset'
    },
    dateAdded:{
        type: Date,
        default: Date.now
    },
    addedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});


const Department = mongoose.model('Department', departmentSchema);

module.exports = Department ;