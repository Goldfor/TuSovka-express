var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userDate: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    verify: {
        type: String,
        required: true
    }
});



const statics = {
}

const methods = {
}

userSchema.methods = methods;
userSchema.statics = statics;

var _userSchema = mongoose.model('User', userSchema);

module.exports = _userSchema;