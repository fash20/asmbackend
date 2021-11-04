const express = require('express')
const router = express.Router()
const Specification = require('../models/specification')

router.route('/add').post(async (req,res)=>{
    let spec = new Specification({
        model: req.body.model,
        storage: req.body.storage,
        ram: req.body.ram,
        processor: req.body.processor,
        other: req.body.other
    });
    spec = await spec.save()
    if(!spec){
        
        return res.status(500).json({status:"error",message:"unable to save specification"})
    }
    return res.status(200).json({success:true, spec });
})

router.route('/').get((req,res)=>{
    Specification.find().then(result=> {
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

router.route('/remove/:id').delete((req,res)=>{
    Specification.findByIdAndDelete(req.params.id)
    .then(result=> res.status(200).json(result))
    .catch(err=> res.status(400).json(err))
})

module.exports = router





