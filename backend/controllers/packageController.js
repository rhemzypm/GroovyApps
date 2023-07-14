const multer = require('multer');
const path = require('path');

// models
const Package = require('../models/packageModel');

// controllers
const factory = require('./handleFactory');

// utils
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/packages/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `package-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new AppError('Mohon isi gambar paket internet', 400), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
});

exports.uploadPackagePhoto = upload.single('packageImage');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// get all packages
exports.getAllPackages = factory.getAll(
  Package,
  'Berhasil mengakses paket internet'
);

// get package
exports.getPackage = factory.getOne(
  Package,
  { path: '_id' },
  'Berhasil mengakses sebuah data paket internet'
);

// create package
exports.createPackage = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'packageName',
    'packageDescription',
    'packagePrice',
    'packageType'
  );

  const url = `${req.protocol}://${req.get('host')}/v1/ga`;

  if (filteredBody.packageType === 'Monthly') {
    const packageNextPayment = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const newPackage = await Package.create({
      packageName: filteredBody.packageName,
      packageDescription: filteredBody.packageDescription,
      packagePrice: filteredBody.packagePrice,
      packageImage: `${url}/uploads/packages/${req.file.filename}`,
      packageType: filteredBody.packageType,
      packageNextPayment,
    });

    res.status(201).json({
      status: 0,
      msg: 'Berhasil menambahkan data paket internet',
      data: newPackage,
    });
  } else if (filteredBody.packageType === 'Yearly') {
    const packageNextPayment = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const newPackage = await Package.create({
      packageName: filteredBody.packageName,
      packageDescription: filteredBody.packageDescription,
      packagePrice: filteredBody.packagePrice,
      packageImage: `${url}/uploads/${req.file.filename}`,
      packageType: filteredBody.packageType,
      packageNextPayment,
    });

    res.status(201).json({
      status: 0,
      msg: 'Berhasil menambahkan data paket internet',
      data: newPackage,
    });
  }
});

// edit package
exports.updatePackage = factory.updateOne(
  Package,
  'Berhasil mengubah data paket internet'
);

// delete package
exports.deletePackage = factory.deleteOne(
  Package,
  'Berhasil menghapus data paket internet'
);
