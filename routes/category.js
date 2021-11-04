const express = require('express')
const router = express.Router()
const Category = require('../models/category')

router.route('/add').post(async(req,res)=>{
    let category = new Category({
        name: req.body.name,
        group: req.body.group
    })
    category = await category.save().catch(err => res.status(400).json(err))
    if(!category){
        res.status(400).json({status:false, message:'Unable to add Category'})
    }
    res.status(200).json({category})
})

router.route('/get').get(async(req,res)=>{

    const category = await Category.find()
    .catch(err => res.status(400).json(err))
    if(!category){
        res.status(400).json({status:false, message:'Unable to get Categories'})
    }
    res.status(200).json({category})
})
router.route('/get/:id').get(async(req,res)=>{

    const category = await Category.findById(req.params.id).catch(err => res.status(400).json(err))
    if(!category){
        res.status(400).json({status:false, message:'Catefory not found'})
    }
    res.status(200).json({category})
})

router.route('/remove/:id').delete(async(req,res)=>{

    const category = await Category.findByIdAndRemove(req.params.id).catch(err => res.status(400).json(err))
    if(!category){
        res.status(400).json({status:false, message:'Unable to remove Catefory'})
    }
    res.status(200).json({status:true, message:'Catefory Removed'})
})

module.exports = router