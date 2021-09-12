const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    channelId : {
        type : String,
        unique : false,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : false,
    }
})

module.exports = mongoose.model('ChannelUser',userSchema);