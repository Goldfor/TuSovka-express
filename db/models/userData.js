var mongoose = require('mongoose');

var userDataSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    library: [mongoose.Schema.Types.ObjectId]
});



const statics = {
}

const methods = {
}

userDataSchema.methods = methods;
userDataSchema.statics = statics;

var _userDataSchema = mongoose.model('userList', userDataSchema);

module.exports = _userDataSchema;