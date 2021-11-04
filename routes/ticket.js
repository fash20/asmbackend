const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const Ticket = require('../models/ticket');
const Asset = require('../models/asset');


router.route('/').get((req,res)=> {
    Ticket.find()
    .then(result => res.status(201).json(result))
    .catch(err=> res.status(400).json(err))
})

router.route('/add').post((req, res) => {
    const asset = Asset.findById(req.body.asset)
    const assetUser = Asset.findById(req.body.assetUser)

    if (!assetUser && !asset ){
        return res.status(400).json({status:"failed", message:"Error user does not exit",})
    }

    const ticket = new Ticket({
        asset: req.body.asset,
        assetUser: req.body.assetUser,
        resolutionDate: req.body.date,
        description: req.body.description,
        status: req.body.status,
    });

    ticket.save()
    .then(result => res.status(201).json(result))
    .catch(err=> res.status(500).json(err))
})

module.exports = router;
