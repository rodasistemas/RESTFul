const express = require('express');
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const users = require("../models/users");
const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400,
    });
}

router.get('/test',async (req,res,next)=>{
  users.then((data)=>{
    res.send(data);
  })
});
module.exports = app => app.use('/auth', router);
