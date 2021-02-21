const { GroupeModel } = require('../models/GroupeModel');

const { handleError, ErrorHandler } = require('../helpers/error');
const mongoose = require('mongoose');


const createGroupe = (req,res) => {
    const newGroupe = new GroupeModel(req.body);

    newGroupe.save((saveErr) => {
        if (saveErr) return handleError(new ErrorHandler(400, saveErr), res);
        return res.json({ error: false, message: "ok", data: newGroupe });
    });
}

const addMemberToGroupe = (req,res) => {
    const groupeId = req.params.id;

    GroupeModel.findById(groupeId, (findErr,group) => {
        if (findErr) return handleError(new ErrorHandler(404, findErr), res);

        req.body.newMembers.forEach(newMemberId => {
            group.members.push(mongoose.Types.ObjectId(newMemberId));
        });

        group.save((err) => {
            if (err) return handleError(new ErrorHandler(400, err), res);
            return res.json({error: false, message: 'Successfully saved' });
        });
    });
}

const getAllGroupes = (req,res) => {
    GroupeModel.find((findErr,acls) => {
        if (findErr) throw new ErrorHandler(400, findErr.message);
        return res.json({ error: false, data: acls});
    });
}
module.exports = {
    createGroupe,
    getAllGroupes,
    addMemberToGroupe,
}
