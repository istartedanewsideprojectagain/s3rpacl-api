const AWS = require('aws-sdk');

const { GroupeModel } = require('../models/GroupeModel');
const { AclModel } = require('../models/AclModel');
const { UploadModel }  = require('../models/UploadModel');

const { handleError, ErrorHandler } = require('../helpers/error');

const s3Client = new AWS.S3({
    accessKeyId: process.env.EXO_KEY,
    secretAccessKey: process.env.EXO_SECRET,
    region :process.env.EXO_REGION,
    endpoint: process.env.EXO_ENDPOINT

});
const uploadParams = {
    Bucket: 'rp-test',
    Key: '', // pass key
    Body: null, // pass file body
};

const uploadFile = (req,res) => {
    const userId = req.user;
    const action = 'create';
    GroupeModel.findOne({ members: userId },(findErr,group) => {
        if(findErr || !group) return handleError(new ErrorHandler(403, "The user is not a membre of any group"), res);
        AclModel.find({ group: group._id,action: action, path: req.body.path }, (findErrAcl,acls) => {
            if(acls.length <1) {
                return handleError(new ErrorHandler(403, "No acl found"), res);
            }
            const params = uploadParams;
            uploadParams.Key = req.body.path + "/" +req.file.originalname;
            uploadParams.Body = req.file.buffer;

            const newUpload = new UploadModel({
                file: req.body.path+"/"+req.file.originalname,
                owner: req.user,
            });
            newUpload.save((err) => {
                if(err) return handleError(new ErrorHandler(500, "Error in save"), res);
                s3Client.upload(params, (err, data) => {
                    if (err) {
                        res.status(500).json({error:"Error -> " + err});
                    }
                    res.json({message: 'File uploaded successfully','filename':
                        req.file.originalname, 'location': data.Location});
                });
            });


        });
    });

}
module.exports = {
    uploadFile,
}
