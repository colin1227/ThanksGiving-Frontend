const express = require('express');
const router = express.Router();
const People = require('../models/people')

router.get("/", async(req, res)=>{
   
    try{
        const everyone = await People.find({name:true});
        console.log(everyone)
        res.json({
            'data': everyone
        })
    }
    catch(err){
        res.json({
            'data': "err"
        })
    }
})

router.post("/invite", async(req,res)=>{
    try{
        person = await People.create({
            name: req.body.name,
            foodBrought: req.body.foodBrought
        })
        res.json({
            'data': `invited ${req.body.name}`
        })
    }
    catch(err){
        res.json({
            'data':"error"
        })
    }
})

module.exports = router;