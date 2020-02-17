const express = require('express')
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { registerValidation ,loginValidation } = require('../validation')

router = express.Router()

router.post('/register', async (req, res) => {

    const { error } = registerValidation(res.body)
    if (error) return error.status(400).send(error);

    //checking if the user already in dbS

    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already Exist')

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const saveuser = await user.save();
        res.send({user:user._id})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login',async (req,res)=>{
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //checking if the user already in dbS

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('user does not Exist')

    const validpass = await bcrypt.compare(req.body.password,user.password)
    if(!validpass) return res.status(400).send('invalid password')

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);

    res.header('auth-token',token).send(token)
})


module.exports = router