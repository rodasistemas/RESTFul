//===========================================================================
// Requires
//===========================================================================
const express = require('express');
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const users = require("../models/users");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
//===========================================================================
const router = express.Router();
//===========================================================================

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400,
    });
}
//===========================================================================
// Routers
//===========================================================================
router.get('/test',async (req,res,next)=>{
    console.log("Entrou alguem");
    res.send('Ok');
  });

router.post('/test',async (req,res,next)=>{
    console.log('POST');
    console.log(req.body);
  res.send('ok');
});

router.post('/register',async (req,res,next)=>{

  const dados = await users.save(req.body);
  res.send(dados);
});
router.post('/authenticate', async (req,res)=>{
  const { email, password } = req.body;
  console.log("Tentativa de Login");
  const user = await users.findEmail({ email });
  if(!user)
      return res.status(400).send({error:'User not found.'});
  if(! await bcryptjs.compare(password,user[0].senha))
      return res.status(400).send({error:'Incorrect password.'});
  user[0].senha = undefined;
  res.send({
      user,
      token: generateToken({id: user[0].id})
      });
});

router.post('/forgot-password', async (req,res)=>{
  const { email } = req.body;
  try{
      const user = await users.findEmail({email});
      if(!user)
          res.status(400).send({error: "User not found!"});
      const token = crypto.randomBytes(20).toString('hex');
      const now = new Date();
      now.setHours(now.getHours()+1);
      await User.findOneAndUpdate(user.id,{
          '$set':{
              passwordResetToken: token,
              passwordResetExpires:now
          }
      });
      mailer.sendMail({
          to: email,
          template:"/auth/forgot-password",
          subject: "Sending Email using Node.js",
          context: {token}
      }, (err)=>{
          if(err){
              return res.status(400).send({error: 'Cannot send forgot password, try again'});

          }else{
              return res.status(200).send({success: 'Token to Forgot Password send success!'});
          }

      });

  }catch(err){

      res.status(400).send({error:"Error on recovery password, try again"});
  }
});
//===========================================================================
module.exports = app => app.use('/auth', router);
