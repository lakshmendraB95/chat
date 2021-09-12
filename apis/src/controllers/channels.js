const ChannelModel = require("../models/channel.js");
const bcrypt = require("bcryptjs");
const ChannelUser = require("../models/channelUser.js");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createChannel = async function (req, res) {
  const { name, password } = req.body;
  const found = await ChannelModel.findOne({ name });
  console.log(req._chat);
  if (found === null) {
    const channel = new ChannelModel({
      name,
      password,
      createdBy: req._chat.user._id,
    });
    await channel.save();
    const channelUser = new ChannelUser({
      channelId: channel._id,
      userId: req._chat.user._id,
    });
    await channelUser.save();
    res.json({
      name: channel.name,
      _id: channel._id,
      createdBy: channel.createdBy,
    });
  } else {
    throw new Error("Channel Already Exists");
  }
};

exports.joinChannel = async function (req, res) {
  const { password, name } = req.body;
  const found = await ChannelModel.findOne({ name });
  console.log(found);
  if (found) {
    if (found.password && !bcrypt.compareSync(password, found.password)) {
      throw new Error("Password is incorrect");
    } else {
      const user = req._chat.user._id;
      const id = found._id;
      const chan = await ChannelUser.findOne({ channelId: id, userId: user });
      if (!chan) {
        const channelUser = new ChannelUser({
          channelId: found._id,
          userId: req._chat.user._id,
        });
        await channelUser.save();
        res.json({
          name: found.name,
          _id: found._id,
          createdBy: found.createdBy,
        });
      } else {
        throw new Error("Already a member of the channel");
      }
    }
  } else {
    throw new Error("Channel does not Exist");
  }
};

exports.listChannel = async function (req, res) {
  const found = await ChannelUser.find({ userId: req._chat.user._id });
  const channelIds = found.map((c) => new ObjectId(c.channelId));
  const channels = await ChannelModel.find({
    _id: { $in: channelIds },
  }).select(["_id", "name"]);

  if (channels.length >= 0) {

    res.json({
      channels,
    });
  } else {
    throw new Error("There was a problem while retreiving the channel list");
  }
};
