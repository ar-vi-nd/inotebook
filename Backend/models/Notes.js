const mongoose = require('mongoose')
const {Schema} = mongoose
const NotesSchema = new Schema({
   userid : {type : String,required : true},
   title : {type : String,required:true},
   description : {type: String,required:true},
   tag : {type : String, required : true , default:'General'},
   date : {type: String, required : true,default:Date.now}
})

module.exports = mongoose.model('notes',NotesSchema)