const router = require('express').Router();

const AclController = require('../controllers/AclsController');

router.get('/', AclController.getAllAcls);
router.post('/', AclController.createAcl);

module.exports = router;
