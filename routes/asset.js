const express = require("express");
const Asset = require("../models/asset");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Category = require("../models/category");
const Review = require("../models/review");
const { json } = require("body-parser");
const Specification = require("../models/specification");

router.route("/add").post(async (req, res) => {
  if (
    !mongoose.isValidObjectId(req.body.category) ||
    !mongoose.isValidObjectId(req.body.spec)
  ) {
    return res.status(400).json({
      success: "false",
      message: "Invalid Category  or Specification id",
    });
  }
  const category = await Category.findById(req.body.category).catch((err) =>
    res.status(400).json(err)
  );
  const spec = await Specification.findById(req.body.spec).catch((err) =>
    res.status(400).json(err)
  );
  if (!category || !spec) {
    res
      .status(400)
      .json({
        success: "false",
        message: "category or specification not found",
      });
  }
  let asset = new Asset({
    hostname: req.body.hostname,
    category: req.body.category,
    spec: req.body.spec,
    serialNo: req.body.serialNo,
    os: req.body.os,
  });
  asset = asset
    .save()
    .then((result) => {
      res.status(200).json(result);
      console.log(count);
    })
    .catch((err) => res.status(400).json(err));
  asset
    ? Category.findByIdAndUpdate(req.body.category, {
        $inc: { count: 1 },
      }).catch((err) => res.status(400).json(err))
    : null;
});

router.route("/get").get(async (req, res) => {
  let asset = await Asset
  // .distinct("category")
  .find()
    .select("category[name]")
    // .populate({path:"category", select:"name  -_id "}).populate({path:"spec", select:"model -_id"}).select('-reviews')
    .catch((err) => res.status(400).json(err));

  if (!asset) {
    return res
      .status(400)
      .json({ status: false, message: "Unable to get Asset" });
  }
  return res.status(200).json(asset);
  
});

router.route("/get/:id").get(async (req, res) => {
  let asset = await Asset.findById(req.params.id).catch((err) =>
    res.status(400).json(err)
  );

  if (!asset) {
    return res
      .status(400)
      .json({ status: false, message: "Unable to get Asset" });
  }
  return res.status(200).json(asset);
});

router.route("/review/:id").put(async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: "false",
      message: "Invalid Asset id",
    });
  }
  let asset = Asset.findById(req.params.id);
  if (!asset) {
    return res.status.json({ success: "false", message: "Asset not found" });
  }
  let reviewId = "";
  let review = new Review({
    asset: req.params.id,
    reviewer: req.body.user,
    review: req.body.review,
    summary: req.body.summary,
  });

  review = await review
    .save()
    .then((result) => {
      result
        ? (resultId = result.id)
        : res.status(400).json("Unable to create review ");
    })
    .catch((err) => res.status(400).json(err));

  asset = await Asset.findByIdAndUpdate(
    req.params.id,
    {
      $push: { reviews: resultId },
    },
    {
      new: true,
    }
  );
  if (!asset) {
    return res.status(500).json({ Message: "Error" });
  }
  return res.status(200).json(asset);
});

router.route("/remove/:id").delete((req, res) => {
  let asset = Asset.findByIdAndRemove(req.params.id)
    .then((result) =>
      res.status(200).json({ status: true, message: "Asset remove" })
    )
    .catch((err) =>
      res.status(400).json({ status: false, message: "Unable to remove Asset" })
    );
});
router.route("/upadte/:id").put((req, res) => {
  let asset = Asset.findByIdAndUpdate(req.params.id)
    .then(
      (result) => res.status(200),
      json({ status: true, message: "Asset Updated" })
    )
    .catch((err) =>
      res.status(400).json({ status: false, message: "Unable to Update Asset" })
    );
});
module.exports = router;
