const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    assetUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'AssetUser',
        required :true
    },
    asset:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Asset',
        required: true,
    },
    description: {
        type: String,
        required:true,
    },
    timeCreated:{
        type: Date,
        default: new Date(),
    },
    resolutionDate:{
        type: String,
        required: true,
        min: Date.now()
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
})

const TicketModel = mongoose.model('Ticket', TicketSchema);
module.exports = TicketModel;