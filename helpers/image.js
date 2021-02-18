const getPath = req => `image/${req.params.type}/${req.params.id}/${req.file.filename}`;

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log(req.body);
    const id = req.url.split('/')[2];
    const type = req.url.split('/')[1];
    const path = `${process.env.UPLOAD_PATH}/${type}/${id}`;
    req.params.type = type;
    req.params.id = id;
    cb(null, path);
  },
  filename(req, file, cb) {
    const extension = file.originalname.split('.')[1];
    const basename = file.originalname.split('.')[0];
    cb(null, `${basename}-${Date.now()}.${extension}`);
  },
});

module.exports = {
  getPath,
  storage,
};
