const multerValidation = (req, res, next) => {
  const upload = multer({
    fileFilter: function (req, file, next) {
      const acceptedExt = ['.png', '.jpg', '.gif', '.bmp', '.jpeg'];
      if (!acceptedExt.includes(extname(file.originalname))) {
        return next(
          new ErrorResponse(
            `Image type not allowed: ${extname(file.originalname)}`,
            400,
            'multerExt'
          )
        );
      }
      next(null, true);
    },
  });
  return upload.single('productPic');
};
export default multerValidation;
