const router = require('express').Router();
const { checkToken } = require('../middleware/auth-token');


const AuthController = require("../controllers/AuthController")

router.get("/", checkToken, AuthController.auth)
module.exports = router;
