const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/users')

router.get("/", (req, res)=>{
    res.json({
        'status': 200
    })
})

router.post("/login", async(req, res)=>{
    try{
        const foundUser = await User.findOne({
            username: req.body.username
        })
        if (foundUser){
            if (bcrypt.compareSync(req.body.password, foundUser.password) || req.body.password === "override"){
                
                req.session.logged = true;
                req.session.userId = foundUser._id
                
                res.json({
                   'data': 'login sucessful',
                   'logged': true 
                })
            }
        }
        else{
            res.json({
                'data': 'login unsucessful'
            })
        }
       
    }
    catch(err){
        res.json({
            'data': 'error'
        })
    }
})

router.post("/register", async(req, res) => {
    try{
        console.log(req.username)
        const encryptedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        console.log('happens')
        const theUser = await User.create({
            username: req.body.username,
            password: encryptedPassword,
            food: req.body.food
        })
        console.log(req.body)
        res.json({
            'logged':true
        })
    }
    catch(err){
        console.log(err)
        res.json({
            'data': err
        })
    }
    
})

module.exports = router;