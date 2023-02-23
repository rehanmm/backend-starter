const mongoose  = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide a title"],
    trim: true,
    maxlength: [20, "title cannot be more than 100 characters"],
  },
  body: {
    type: String,
    required: [true, "please provide a body"],
    trim: true
  }
},{
  timestamps:true
});

module.exports=mongoose.model('Note',noteSchema);