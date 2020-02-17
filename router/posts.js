const router = require('express').Router();
const verify = require('./verify')

router.get('/',verify,(req,res)=>{
    res.json({
        posts:{
            title:'my first post',
            description:"random data you shouldn't access"
        }
    })
})

module.exports = router