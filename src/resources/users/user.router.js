const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const cloudinary = require('cloudinary').v2;

const userService = require('./user.service');
const { id, user } = require('../../utils/validation/schemas');
const {
  validator,
  userIdValidator
} = require('../../utils/validation/validator');
const { upload } = require('../../utils/storage/uploader');

router.post('/', validator(user, 'body'), async (req, res) => {
  upload(req, res, async err => {
    if (err) {
      return res
        .status(400)
        .json({ avatar: 'Please upload your profile image.' });
    }
    const uploadedImage = await cloudinary.uploader.upload(
      req.file.path,
      (error, result) => {
        return result;
      }
    );
    const userData = { ...req.body, image: uploadedImage.secure_url };
    const userEntity = await userService.save(userData);
    res.status(OK).send(userEntity.toResponse());
  });
});

router.get(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    const userEntity = await userService.get(req.params.id);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.put(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  validator(user, 'body'),
  async (req, res) => {
    const userEntity = await userService.update(req.userId, req.body);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.delete(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  }
);

module.exports = router;
