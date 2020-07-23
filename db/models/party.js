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
    rulers: [String],
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
    return this.findById(_id);
}

function createOne(object, callback) {
    object['timeinit'] = Date.now()
    this.create(object, callback)
    
}

function findParty(name, ruler, notRuller){
    var regular = new RegExp(`${name}`, 'i')
    var _ruler = ruler.split("$")
    var _notRuller = notRuller.split("$")
    var _find = this.find({name : regular })
    if(_ruler[0] != '')
        _find = _find.find({rulers: {$all : _ruler}})
    if(_notRuller[0] != '')
        _find = _find.find({rulers: {$not : {$all : _notRuller}}})
    return _find;
}


const statics = {
    getAll,
    getParty,
    createOne,
    findParty
}
const methods = {
}

partySchema.methods = methods;
partySchema.statics = statics;

var _partySchema = mongoose.model('partiesList', partySchema);

module.exports = _partySchema;