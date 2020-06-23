var mongoose = require('mongoose');

var partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    stopVerify:{
        type: Number,
        required: true,
    },
    timeStart: {
        type: Number,
        required: true,
    },
    rulers: [{
        type: { 
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        }
    }],
    photos: [{
        _id: {
            type: String,
            required: true,
        }
    }],
    mainPhoto: {
        _id: {
            type: String,
            required: true,
        }
    }
});


function getAll(){
    return this.find().sort({ timeStart: 'asc'});
}

function getParty(_id){
    return this.find({_id});
}


const statics = {
    getAll,
    getParty
}
const methods = {

}

partySchema.methods = methods;
partySchema.statics = statics;

var _partySchema = mongoose.model('partiesList', partySchema);

module.exports = _partySchema;