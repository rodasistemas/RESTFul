//===========================================================================
// Requires
//===========================================================================
const db = require("../database/index");
//===========================================================================
const users_types = db("user_types");
//===========================================================================
// Schema
//===========================================================================
const schema = {
    table: function(){
        return users_types;
    },
    list: function(){
      return users_types.then((data)=>{return data });
    },
    show: function(id){
      return users_types.where("id",id).then((data)=>{return data })
    },
    save: function(data){
      return users_types.insert(data).then((data)=>{return data})
    }
}
//===========================================================================
module.exports = schema;
