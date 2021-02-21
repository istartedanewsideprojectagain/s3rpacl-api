const { AclModel } = require('../models/AclModel');

const { handleError, ErrorHandler } = require('../helpers/error');

const createAcl = (req,res) => {
    const newAcl = new AclModel(req.body);
    newAcl.save((saveErr) => {
        if (saveErr) return handleError(new ErrorHandler(400, saveErr), res);
        return res.json({message: 'ok', data: newAcl});
    });
}

const getAllAcls = (req,res) => {
    AclModel.find((findErr,acls) => {
        if (findErr) throw new ErrorHandler(400, findErr.message);
        return res.json(acls);
    });
}
module.exports = {
    createAcl,
    getAllAcls,
}
