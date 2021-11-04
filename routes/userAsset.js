const express = require('express')
const router = express.Router();
const UserAsset = require('../models/userAsset')



router.route('/').get((req,res)=> {
    UserAsset.find()
    .then(result => res.status(201).json(result))
    .catch(err=> res.status(400).json(err))
})

router.route('/add').post((req, res) => {
    const asset = Asset.findById(req.body.asset)
    
    if (!assetUser && !asset ){
        return res.status(400).json({status:"failed", message:"Error user does not exit",})
    }

    const userAsset = new UserAsset({
        asset: req.body.asset,
        assetUser: req.body.assetUser,
        resolutionDate: req.body.date,
        description: req.body.description,
        status: req.body.status,
    });

    userAsset.save()
    .then(result => res.status(201).json(result))
    .catch(err=> res.status(500).json(err))
})

module.exports = router