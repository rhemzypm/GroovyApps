const multer = require('multer');
const path = require('path');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const factory = require('./handleFactory');

const User = require('../models/userModel');
const Voucher = require('../models/voucherModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/vouchers/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `voucher-${Date.now()}${ext}`);
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
    cb(new AppError('Mohon upload gambar voucher', 400), false);
  }
};

// using multer middleware multi-part form data (upload pics)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 },
});

// upload user photo
exports.uploadVoucherImage = upload.single('voucherImage');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllVouchers = factory.getAll(
  Voucher,
  'Berhasil memperoleh semua data voucher'
);

exports.getVoucher = factory.getOne(
  Voucher,
  { path: '_id' },
  'Berhasil memperoleh sebuah data voucher'
);

exports.createVoucher = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'voucherTitle',
    'voucherType',
    'voucherDescription',
    'voucherPrice'
  );

  const url = `${req.protocol}://${req.get('host')}/v1/ga`;

  const validUntilDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const newVoucher = await Voucher.create({
    voucherTitle: filteredBody.voucherTitle,
    voucherType: filteredBody.voucherType,
    voucherDescription: filteredBody.voucherDescription,
    voucherPrice: filteredBody.voucherPrice,
    voucherImage: `${url}/uploads/vouchers/${req.file.filename}`,
    validUntilDate: validUntilDate,
  });

  res.status(201).json({
    status: 0,
    msg: 'Berhasil menambahkan data voucher',
    data: newVoucher,
  });
});

exports.updateVoucher = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const filteredBody = filterObj(
    req.body,
    'voucherTitle',
    'voucherType',
    'voucherDescription',
    'voucherPrice'
  );

  const url = `${req.protocol}://${req.get('host')}/v1/ga`;

  const voucher = await Voucher.findByIdAndUpdate(
    id,
    {
      voucherTitle: filteredBody.voucherTitle,
      voucherType: filteredBody.voucherType,
      voucherDescription: filteredBody.voucherDescription,
      voucherPrice: filteredBody.voucherPrice,
      voucherImage: `${url}/uploads/vouchers/${req.file.filename}`,
    },
    { new: true, runValidators: true }
  );

  await voucher.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 0,
    msg: 'Berhasil mengubah data voucher',
    data: voucher,
  });
});

exports.deleteVoucher = factory.deleteOne(
  Voucher,
  'Berhasil menghapus sebuah data voucher'
);

// redeeming voucher
exports.redeemVoucher = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    const voucher = await Voucher.findOne({ _id: id });

    if (!voucher) {
      return next(new AppError('Voucher not found', 404));
    }

    if (user.point < voucher.voucherPrice) {
      return next(new AppError("You don't have enough point to redeem", 400));
    }

    user.point -= voucher.packagePrice;
    await user.save();

    // redeem voucher
    voucher.redeemedBy = user._id;
    await voucher.save();

    // check if the voucher has already been redeemed
    if (voucher.redeemedBy) {
      return next(new AppError('Voucher has already been redeemed', 400));
    }

    // add the redeemed voucher to the user's redeemedVouchers array
    const redeemedVoucher = {
      voucher: voucher._id,
      redeemedAt: new Date(),
    };

    user.redeemedVouchers.push(redeemedVoucher);
    await user.save();

    // send an email for voucher code (nanti)

    res.status(200).json({ status: 0, msg: 'Voucher saved successfully' });
  } catch (err) {
    console.err(err);

    return next(
      new AppError('An error occurred while redeeming the voucher', 500)
    );
  }
});
