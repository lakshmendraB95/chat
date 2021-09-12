const messageModel = require("../models/message.js");
const MessageChannel = require("../models/messageChannel");
const ObjectId = require('mongoose').Types.ObjectId;
const UserModel = require("../models/user.js");
const ChannelUser = require("../models/channelUser.js")

exports.createMessage = async function(req,res){
   const {text} = req.body;
   const message = new messageModel( {
       text,
       userId : req._chat.user._id
   })
   await message.save();

   const messageUser = new MessageChannel({
       channelId : req.body.channelId,
       messageId : message._id
    })
    await messageUser.save();

    const user = await UserModel.findOne({
        _id: new ObjectId(message.userId),
    });

    res.json({
        message: {
            _id: message._id,
            text: message.text,
            createdAt: message.createdAt,
            user: {
                username: user.username,
                name: user.name,
            },
        },
    });
};
exports.listMessages = async function(req, res){
    const {channelId} = req.params;
    const user = req._chat.user._id
    const auth = await ChannelUser.findOne({
        channelId: channelId,
        userId: user,
    });
    console.log(auth)
    if (auth){
    const found = await MessageChannel.find({channelId});
    const messageIds = found.map(c => new ObjectId(c.messageId))
    const messages = await messageModel.find({
        _id: { $in: messageIds },
    }).select([ 'text', 'userId', 'createdAt']);
    const userIds = messages.map(c => new ObjectId(c.userId));
    const users = await UserModel.find({
        _id: { $in: userIds},
    }).select(['username', 'name']);
    let finalMessages = [];

    const usersMap = {};
    for (let user of users) {
        usersMap[String(user._id)] = user;
    }
    console.log(usersMap)

    for (let message of messages){
        const user = usersMap[message.userId];
        finalMessages.push({
            _id: message._id,
            text:message.text,
            user,
            createdAt: message.createdAt,
        });
    }
    res.json({
        messages: finalMessages,
    })
}
 else{
     throw new Error("User not a member of this channel");
 }
}
