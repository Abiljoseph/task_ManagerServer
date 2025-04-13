const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

// this is signUp controller
exports.signUp = async (req, res) => {
  try {
    const { email, password, confirmPassword, fname, sname } = req.body;
    const username = fname.concat(sname)
    if(!email || !password || !confirmPassword){
      return res.status(400).json({ message: "All fields are required" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if(password !== confirmPassword){
      return res.status(400).json({ message: "check your credantials"})
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    user = new User({
       username, 
       email, 
       password : hash, 
       fname, 
       sname});
    await user.save();

    res.status(200).json({ 
      message: "User Registered Successfully", 
      user 
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

//this is signIn controller
exports.signIn = async(req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"check your credantials"})
    }
    const isValid = await bcrypt.compare(password,user.password);
    if(!isValid){
      return res.status(400).json({message:"check your credantials"}) 
    }
    let token1 = generateToken({id:user._id})
    console.log("login success full")
    res.status(200).json({message:"logined successfully",token1, user})
}
const generateToken = (payload) => {
  const secretKey = 'Abi123';
  const options = {
    expiresIn: '1h',
  };
  const token = jwt.sign(payload, secretKey, options);
    return token;
}