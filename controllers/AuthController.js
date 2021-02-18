const { GroupeModel } = require('../models/GroupeModel');
const { AclModel } = require('../models/AclModel');

const { handleError, ErrorHandler } = require('../helpers/error');


const auth = (req,res) => {
    const userId = req.user;
    const action = 'read';
    let path = req.headers['x-original-uri'];
    console.log(path);
    path = path.split('/')[2];
    console.log(path);


    GroupeModel.findOne({ members: userId },(findErr,groupe) => {
        console.log(groupe)
        if(findErr || !groupe) return handleError(new ErrorHandler(403, "The user is not a membre of any groupe"), res);
        AclModel.find({ groupe: groupe._id,action: action, path: path }, (findErrAcl,acls) => {
            console.log(acls)
            if(acls.length < 1) return handleError(new ErrorHandler(403, "No acl found"), res);
            res.status(200)
            res.json("ok");

            // Acl found
        });
    });
}


module.exports = {
    auth,
}
