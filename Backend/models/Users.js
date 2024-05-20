const mongoose = require('mongoose')
const {Schema} = mongoose
const UserSchema = new Schema({
   name : {type : String,required:true},
   email : {type: String,required:true,unique:true},
   password : {type : String, required : true},
   date : {type: String, required : true,default : Date.now}
})

const User = mongoose.model('User',UserSchema)

// User.createIndexes();
// commented this because now we are using the find one command to fetch a user from the database if it exists and thus not creating indexes

module.exports = User