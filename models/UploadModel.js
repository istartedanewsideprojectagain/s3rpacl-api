const mongoose = require('mongoose');

const { Schema } = mongoose;
const UploadSchema = new Schema({
    file: {
        type: String,
        required: 'The filename is required',
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

const UploadModel = mongoose.model('Upload', UploadSchema);

module.exports = {
    UploadModel,
    UploadSchema
}
