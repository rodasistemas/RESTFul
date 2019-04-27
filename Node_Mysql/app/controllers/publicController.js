//===========================================================================
// Requires
//===========================================================================
const express = require('express');
const tipo_usuario = require("../models/usertypes");
const usuario = require("../models/users");
//===========================================================================
const router = express.Router();
//===========================================================================
// Rotas
//===========================================================================
router.get('/user-types',async(req,res,next)=>{
    const dados = await tipo_usuario.list();
    res.send(dados);
});

router.post("/email",  async (req,res)=>{
  const {email} = req.body;
  try{
      if ( await usuario.findEmail({ email }))
      {
          return res.status(400).send({error: 'Email already exists.'});
      }else
      {
          return res.send(true);
      }

  }catch(err){
      if(err)
          return res.status(400).send({error:"Error on get email, try again"});
  }
});
//===========================================================================
module.exports = app => app.use('/public', router);
