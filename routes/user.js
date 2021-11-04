const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


router.route('/register').post((req, res) => {
    const user = new User({
        name: req.body.name.toLowerCase(),
        password: bcrypt.hashSync(req.body.password, 10)
    })

    user.save()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json(err))
})

router.route('/login').post(async (req, res) => {
    let token = ''
    let user = await User.findOne({ name: req.body.name.toLowerCase() })
        .catch(err => res.status(400).json(err))

    if (!user) {
        return res.status(400).json('User not found');
    }
    else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            token = jwt.sign(
                {
                    id: user._id
                },
                process.env.JWT,
                {
                    expiresIn: "1d"
                }
            )
            res.status(200).json(token)
        }
        
        return res.status(400).json({ Suceess: "error", message: "incorrect name or/and password" })
    }
})
router.route('/remove:id').delete((req,res)=>{

    User.findByIdAndDelete(req.params.id)
        .then(result=> res.status(200).json('User removed successfully'))
        .catch(err=> res.status(400).json('Unable to remove this user'))
})
router.route('/').get((req,res)=>{
    User.find().select('-password')
    .then(result => res.status(200).json(result))
    .catch(err=> res.status(400).json("Unable to fetch users"))
})

module.exports = router
