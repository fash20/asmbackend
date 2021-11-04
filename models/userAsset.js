const mongoose = require('mongoose');


const userAssetSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
    },
    asset:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Asset',
        required: true,
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Department',
        required: true
    }
})

const userAssetModel = mongoose.model('UserAsset', userAssetSchema);
module.exports = userAssetModel;