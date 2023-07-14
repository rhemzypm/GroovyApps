const multer = require('multer');

const path = require('path');

// models
const Admin = require('../models/adminModel');

// util
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// controllers
const factory = require('./handleFactory');

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user-${Date.now()}${ext}`);
  },
});

// multer filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new AppError('Mohon upload gambar profile Anda', 400), false);
  }
};

// using multer middleware multi-part form data (upload pics)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
});

// upload user photo
exports.uploadUserImage = upload.single('profileImage');

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };

// memperolehkan semua user
exports.getAllAdmins = factory.getAll(Admin, 'Berhasil mengakses data admin');

// memperolehkan sebuah user
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.admin.id;

  next();
});

exports.getAdmin = factory.getOne(Admin, { path: '_id' }, 'Success');
