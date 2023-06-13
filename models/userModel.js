const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    user_name:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }

})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;