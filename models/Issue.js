const mongoose = require ('mongoose');


const issueSchema = mongoose.Schema({
    asset:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Asset',
        required: true,
    },
    issuer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    authorizedby:{
        type:String,
        required:true
    },
    issueDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Department'
    }
})

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;