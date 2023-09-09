const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT = 12;
const SECRET_KEY = "sjskbjdnbhjnbhjcsnskhnjdb";

module.exports.Register = async (req, res) => {
    const data = req.body;
  
    if (!(data.password && data.username)) {
      return res.status(400).json({
        msg: "All inputs are required",
      });
    }
  
    try {
      const existingUser = await User.findOne({
        $or: [{ username: data.username }],
      });
  
      if (existingUser) {
        const errors = {};
  
        if (existingUser.username === data.username) {
          errors.username = "Username is already taken";
        }
  
        return res.status(400).json({
          msg: "Registration failed",
          errors,
        });
      }
  
      const hashedpassword = await bcrypt.hash(data.password, SALT);
  
      let datas = {
        username: data.username,
        password: hashedpassword,
      };
  
      const new_user = new User(datas);
      await new_user.save();
  
      const token = jwt.sign({ id: new_user._id, username: new_user.username },SECRET_KEY);
      res.cookie('session', token, { httpOnly: true})
    
      return res.status(200).json({
          msg: "User created successfully, Logged In Successfully",
          token: token,
        });
     
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        msg: "Internal server error",
      });
    }
  };

  module.exports.Login = async (req, res) => {
    const data = req.body;
    if (!(data.username && data.password)) {
        return res.status(400).json({
          error: "Please provide your username and password",
        });
      }
  
    const user = await User.findOne({ username: data.username });
    
    if (!user) {
        return res.status(401).json({
          error: "Incorrect username or password",
        });
      }
  
    const correctPassword = await bcrypt.compare(data.password, user.password);
    if (!correctPassword) {
        return res.status(401).json({
          error: "Incorrect username or password",
        });
      }
      
    const token = jwt.sign({ id: user._id, username: user.username },SECRET_KEY);
    res.cookie('session', token, { httpOnly: true})
  
    return res.status(200).json({
        msg: "Logged In Successfully",
        token: token,
      });
  };