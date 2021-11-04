const express = require('express');
require('dotenv').config()
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const asset = require('./routes/asset');
const user = require('./routes/user')
const category = require('./routes/category');
const report = require('./routes/report')
const specification = require('./routes/specification')
const ticket = require('./routes/ticket')
const userAsset =require('./routes/userAsset')


const port = process.env.PORT
const monogPort = process.env.MONGO_PORT


app.use(cors())
app.options('*', cors())
app.use(bodyparser.json())
app.use(morgan('tiny'))
app.use('/asset',asset);
app.use('/category', category);
app.use('/report', report);
app.use('/user',user)
app.use('/spec', specification)
app.use('/ticket', ticket)
app.use('/userasset', userAsset)

mongoose.connect(monogPort,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(()=>console.log('Connection to DB successful'))
.catch((err)=>console.log('Error Connecting to DB'))



app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is online"
    })
})
app.listen(port, ()=>{
    console.log('server is online on ' +port)
})