const db = require("../database/index");
const users = db("users").join("user_types","users.tipo_usuario","=","user_types.id");


module.exports = users;
