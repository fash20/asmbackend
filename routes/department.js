const express = require('express')
const router = express.Router()
const Department = require('../models/department')



router.route('/get').get((req,res)=>{
    Department.find()
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=> res.status(500).json({status:false, message:'unable to get department'})) 
});

router.route('/add').post((req,res)=>{
    let department = new Department({
        name:req.body.name,
        assets:req.body.asset,
        addedBy:req.body.user
    })

    department.save()
    .then(result=> res.status(200).json({
        result
    }))
    .catch(
        err=> res.status(500).json(err)
    )
})


module.exports = router 