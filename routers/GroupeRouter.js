const router = require('express').Router();

const GroupeController = require('../controllers/GroupeController');
router.get('/', GroupeController.getAllGroupes);
router.post('/', GroupeController.createGroupe);
router.post('/:id/members', GroupeController.addMemberToGroupe);


module.exports = router;
