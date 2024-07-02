const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  profilePhoto: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    requried: true
  }
},{
  timestamps:true
}
)

 const User=mongoose.model("User",userModel)
 module.exports = User;
