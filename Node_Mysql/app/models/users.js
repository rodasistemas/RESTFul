//===========================================================================
// Require
//===========================================================================
const db = require("../database/index");
const bcryptjs = require("bcryptjs");
//===========================================================================
const users = db("users").join("user_types","users.tipo_usuario","=","user_types.id");
//===========================================================================
// Schema
//===========================================================================
const schema = {
    table: function(){
        return users;
    },
    list: function(){
      return users.then((data)=>{return data });
    },
    show: function(id){
      return users.where("users.id",id).then((data)=>{return data })
    },
    save: async function(data){
      const hash = await bcryptjs.hash(data.senha,10);
      data.senha = hash;
      return users.insert(data).then((data)=>{return data})
    },
    findEmail: function(email){
      return db("users").where("email",email.email).limit(1).then((data)=>{
        if(data.length > 0){
          return data;

        }else{
          return null;
        }
      });
    }
}
//===========================================================================
module.exports = schema;
