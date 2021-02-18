const mongoose = require('mongoose');

const { Schema } = mongoose;
const AccountSchema = new Schema({
});

const AccountModel = mongoose.model('Account', AccountSchema);

module.exports = {
    AccountModel,
    AccountSchema
}
