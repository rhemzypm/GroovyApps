const mongoose = require('mongoose');
const validator = require('validator');

// membuat sebuah skema
const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    firstName: {
      type: String,
      required: [true, 'Mohon isi nama awal pengguna Anda'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Mohon isi nama akhir pengguna Anda'],
      trim: true,
    },
    emailAddress: {
      type: String,
      lowercase: true,
      required: [true, 'Mohon isi alamat e-mail pengguna Anda'],
      validate: [
        validator.isEmail,
        'Alamat e-mail pengguna harus sesuai dengan format e-mail',
      ],
      sparse: true,
      unique: true,
      trim: true,
    },
    nomorHP: {
      type: String,
      required: [true, 'Mohon isi nomor HP Anda'],
      sparse: true,
      unique: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    activeExpiredByDate: Date,
    otp: {
      type: Number,
      expires: '5m',
      index: true,
    },
    otpExpiration: Date,
    profileImage: {
      type: String,
      default: 'uploads/users/default.jpeg',
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user',
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, 'Balance cannot have negative number'],
    },
    point: {
      type: Number,
      default: 0,
      min: [0, 'Point cannot have negative number'],
    },
    paymentStatus: {
      type: String,
      enum: ['done', 'process'],
      default: undefined,
    },
    purchasedPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
    redeemedVouchers: [
      {
        voucher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Voucher',
        },
        redeemedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', function (next) {
  const doc = this;
  if (doc.isNew) {
    const timestamp = new Date().getTime().toString();
    const nomorHP = doc.nomorHP;
    const userIdString = timestamp + nomorHP;
    doc.userId = userIdString;
  }
  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate('purchasedPackage').populate({
    path: 'purchasedPackage',
    select:
      'packageName packageDescription packagePrice packageImage packageType packageNextPayment',
  });

  this.populate('redeemedVouchers').populate({
    path: 'redeemedVouchers',
    select:
      'voucherName, voucherDescription voucherPrice voucherImage validUntilDate',
  });

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
