const mongoose = require('mongoose');


const reportSchema = mongoose.Schema({
    incident:{
        type: String,
        required: true,
    },
    solution:{
        type:String,
        required:true
    },
    result:{
        type: String,
        require:true
    },
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    incidentDate:{
        type: String,
        default: Date
    },
    asset:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Asset',
        required:true
    },
    timeSpent:{
        type: String,
        required:true,
        default:"1min"
    }

});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;