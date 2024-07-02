const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { name, username, password, confirmPassword, gender } = req.body;
    if (!name || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json("all field must be required")
    }
    if (password != confirmPassword) {
      return res.status(400).json("password do not matching")
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "user already exist" })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      name,
      username,
      password: hashPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender
    })
    return res.status(200).json({ message: "account created successfully",success:true })

  } catch (error) {
    console.log(error);
  }

}



const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Incorrect username or password" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ message: "Please enter a valid password" });
    }

    const tokenData = {
      userID: user._id
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '10d' });

    return res.status(200).cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      sameSite: 'strict'
    }).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      profilePhoto: user.profilePhoto,
      success:true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req,res) =>{
  try{
   return res.status(200).cookie("token","",{maxAge:0}).json({
    message:"logout successfully",
    success:true
   })
  }catch(error){
     console.log(error);
  }
}

const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserID = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserID } }).select("-password");
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { register , login , logout , getOtherUsers}