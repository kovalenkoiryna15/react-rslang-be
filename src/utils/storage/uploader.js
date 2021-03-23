const multer = require('multer');
const fs = require('fs');

const { fileValidator } = require('../../utils/validation/validator');

// Set Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = '../../../public/uploads/';
    fs.mkdir(path, { recursive: true });
    return cb(null, path);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

// Init Upload
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1
  },
  fileValidator
}).single('image');

module.exports = { upload };
