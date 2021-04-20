import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinaryV4 } from 'cloudinary';
import { extname } from 'path';
import ErrorResponse from '../../utils/errorResponse.js';

const multerUploadCloudinary = (req, res, next) => {
  const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinaryV4,
    params: {
      folder: 'strivezon',
    },
  });

  const upload = multer({
    storage: cloudinaryStorage,
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

export default multerUploadCloudinary;
