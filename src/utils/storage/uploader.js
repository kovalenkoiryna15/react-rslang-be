const multer = require('multer');
const fs = require('fs');

const { fileFilter } = require('../../utils/validation/validator');

// Set Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = './uploads/';
    // eslint-disable-next-line no-sync
    fs.mkdirSync(path, { recursive: true });
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
  fileFilter
}).single('image');

module.exports = { upload };
