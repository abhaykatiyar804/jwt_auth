const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./router/auth')
const postRoute = require('./router/posts')
const bodyparser = require('body-parser')



dotenv.config()

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => { console.log('connected to db') })




//Middleware

app.use(express.json())

app.use('/api/user', authRoute)
app.use('/api/posts',postRoute)

app.listen(3000, () => { console.log('serverup and runing') })