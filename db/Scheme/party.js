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
    description: {
        type: String,
        required: true,
    },
    timeinit:{
        type: Number,
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
        id: {
            type: String,
            required: true,
        }
    }],
    mainPhoto: {
        id: {
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

function createOne(object, callback) {
    object['timeinit'] = Date.now()
    this.create(object, callback)
    
}


const statics = {
    getAll,
    getParty,
    createOne
}
const methods = {
}

partySchema.methods = methods;
partySchema.statics = statics;

var _partySchema = mongoose.model('partiesList', partySchema);

module.exports = _partySchema;