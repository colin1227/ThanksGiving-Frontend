const express = require('express');
const router = express.Router();
const Food = require("../models/food");

router.get('/', async(req, res)=>{
    try{
    const food = await Food.find({});
    res.json({
        'data': food
    })
    }
    catch(err){
        res.json({
            'data': 'error pulling food'
        })
    }
})