const multer = require('multer');
const path = require('path');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const factory = require('./handleFactory');

const Promo = require('../models/promoModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/promos/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `promo-${Date.now()}${ext}`);
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
    cb(new AppError('Mohon upload gambar promo', 400), false);
  }
};

// using multer middleware multi-part form data (upload pics)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
});

// upload user photo
exports.uploadPromoImage = upload.single('promoImage');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllPromos = factory.getAll(
  Promo,
  'Berhasil memperoleh semua data promosi'
);

exports.getPromo = factory.getOne(
  Promo,
  { path: '_id' },
  'Berhasil memperoleh sebuah data promo'
);

exports.createPromo = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, 'promoTitle', 'promoContent');

  const url = `${req.protocol}://${req.get('host')}/v1/ga`;

  const newPromo = await Promo.create({
    promoTitle: filteredBody.promoTitle,
    promoContent: filteredBody.promoContent,
    promoImage: `${url}/uploads/promos/${req.file.filename}`,
  });

  res.status(201).json({
    status: 0,
    msg: 'Berhasil menambahkan data promosi',
    data: newPromo,
  });
});

exports.updatePromo = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const filteredBody = filterObj(req.body, 'promoTitle', 'promoContent');

  const url = `${req.protocol}://${req.get('host')}`;

  const promo = await Promo.findByIdAndUpdate(
    id,
    {
      promoTitle: filteredBody.promoTitle,
      promoContent: filteredBody.promoContent,
      promoImage: `${url}/uploads/${req.file.filename}`,
    },
    { new: true, runValidators: true }
  );

  await promo.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 0,
    msg: 'Berhasil mengubah data promo',
    data: promo,
  });
});

exports.deletePromo = factory.deleteOne(
  Promo,
  'Berhasil menghapus sebuah data promo'
);
