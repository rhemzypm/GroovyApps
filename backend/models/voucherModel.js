const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema(
  {
    voucherTitle: {
      type: String,
      require: [true, 'Mohon isi nama voucher'],
    },
    voucherType: {
      type: String,
      enum: ['Food', 'Token', 'Pulsa'],
      require: [true, 'Mohon isi tipe voucher'],
    },
    voucherDescription: {
      type: String,
      require: [true, 'Mohon isi deskripsi voucher'],
    },
    voucherPrice: {
      type: String,
      require: [true, 'Mohon isi harga voucher'],
    },
    voucherImage: {
      type: String,
      require: [true, 'Mohon isi gambar voucher'],
    },
    validUntilDate: Date,
    redeemedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

voucherSchema.pre(/^find/, function (next) {
  this.populate('redeemedBy').populate({
    path: 'redeemedBy',
    select: 'firstName lastName emailAddress nomorHP profileImage',
  });

  next();
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
