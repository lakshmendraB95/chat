const UserModel = require("../models/user.js");
const auth = require("../helpers/auth");
const bcrypt = require("bcryptjs");
const config = require("../config");

exports.register = async function (req, res) {
  const { username, password, name } = req.body;
  const found = await UserModel.findOne({ username });
  console.log("HERE");
  if (found === null) {
    const user = new UserModel({
      username,
      password,
      name,
    });
    await user.save();
    await loginUser(res,{_id:user._id});
    res.json({
      _id: user._id,
      username: user.username,
      name: user.name,
    });
  } else {
    throw new Error("Username Already Exists");
  }
};

async function loginUser(res, userInfo) {
  const sessionId = await auth.encode(userInfo);
  res.set(config.get("auth.header"), sessionId);
}

exports.login = async function (req, res) {
  const { username, password } = req.body;
  console.log(username, password);
  const found = await UserModel.findOne({ username });
  console.log(found);
  if (found !== null && bcrypt.compareSync(password, found.password)) {
    await loginUser(res, { _id: found._id });
    res.json({
      _id: found._id,
      username: found.username,
      name: found.name,
    });
  } else {
    throw new Error("Username or Password is incorrect");
  }
};

exports.userData = async function (req,res ){
  if(req._chat.user)
{
  const _id = req._chat.user._id;
 const found = await UserModel.findOne({_id});
 if (found !== null)
 {
   res.json({
     username: found.username,
     name: found.username
   });
 }
 else{
   throw new Error("User not found ")
 }
}
else
{
  throw new Error ("Something went wrong");
}
}