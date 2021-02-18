const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({storage: storage});

const UploadController = require("../controllers/UploadController")
const { checkToken } = require('../middleware/auth-token');

router.post("/", checkToken, upload.single("file"),UploadController.uploadFile)
module.exports = router;
