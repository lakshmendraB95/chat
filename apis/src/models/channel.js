const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : false,
        set : (value) => {
            if (!value) {
                return;
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            return hash;
        }
    },
    createdBy : {
        type  : String,
        required : true,
        
    }
})

module.exports = mongoose.model('Channel',userSchema);