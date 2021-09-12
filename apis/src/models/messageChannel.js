const mongoose = require ('mongoose');

const messageChannelSchema = new mongoose.Schema({
    channelId : {
        type : String,
        required : true,
        unique : false
    },
    messageId : {
        type : String,
        required : true,
        unique : false
    }
})

module.exports = mongoose.model('MessageChannel',messageChannelSchema);