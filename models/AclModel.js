const mongoose = require('mongoose');

const { Schema } = mongoose;

const AclSchema = new Schema({
    path: {
        type: String,
        unique: true,
        required: 'The path is require'
    },
    action: [{
        type: String,
        enum : ['create','read'],
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Groupe'
    }
});

const AclModel =  mongoose.model('Acl', AclSchema);
module.exports = {
    AclModel,
    AclSchema,
}
