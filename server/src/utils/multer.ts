import multer from 'multer';
import path from 'path';
import AppError from './AppError';

const UPLOAD_FOLDER = path.join(__dirname, '../uploads/');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = path.extname(file.originalname as string);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new AppError(400, 'Invalid file type'));
    } else {
      cb(null, true);
    }
  },
});

export default upload;
