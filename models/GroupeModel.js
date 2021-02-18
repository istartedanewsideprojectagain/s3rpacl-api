const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupeSchema = new Schema({
    members: [{
        type: String,
    }]
});

const GroupeModel = mongoose.model('Groupe', GroupeSchema);
module.exports = {
    GroupeSchema,
    GroupeModel
}
