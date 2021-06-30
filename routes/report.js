const express = require('express');
const mongoose = require('mongoose');
const Asset = require('../models/asset');
const Report = require('../models/report');
const router = express.Router();

router.route('/get').get(async (req, res) => {
    const reports = await Report.find()
        .populate({
            path:'asset', populate:{
                path: 'category'
            }
        })

    if (!reports) {
        return res.status(400).json({ sucess: false, message: "Unable to fetch reports" });
    }
    res.status(200).json(reports)

});
router.route('/add').post(async (req, res) => {
    const asset = await Asset.findById(req.body.asset).catch(err=> res.status(404).json(err));
    if (!mongoose.isValidObjectId(req.body.asset) || !asset) {
        return res.status(400).json({ Error: 'Asset ID invalid or Asset does not exit' })
    }

    let report = new Report({
        incident: req.body.incident,
        solution: req.body.solution,
        result: req.body.result,
        asset: req.body.asset
    })
    report = await report.save()
    if (!report) {
        return res.status(400).json({ sucess: false, message: "Unable to  save reports" });
    }
    res.status(200).json({ success: true, report })

});

router.route('/remove/:id').delete((req, res) => {

    let report = Report.findByIdAndRemove(req.params.id)
        .then(result => res.status(200).json({ status: true, message: 'Report remove' }))
        .catch(err => res.status(400).json({ status: false, message: "Unable to remove Report" }))
})
router.route('/upadte/:id').put((req, res) => {

    let report = Report.findByIdAndUpdate(req.params.id)
        .then(result => res.status(200), json({ status: true, message: 'Report Updated' }))
        .catch(err => res.status(400).json({ status: false, message: "Unable to Update Asset" }))
})

router.route('/get/count').get(async (req, res) => {
    const reportCount = await Report.count(count => count)
    if (!reportCount)
        return res.status(500).json({
            success: false,
            message: 'Unable to get Report count'
        })
    return res.status(200).json({ ReportCount: reportCount })

})
router.route('/get/assetreport/:id').get( (req,res)=>{
    Report.find().where('asset').equals(req.params.id)
        .then(result=> res.status(200).json(result))
        .catch(err=> res.status(400).json(err))

})


module.exports = router;
