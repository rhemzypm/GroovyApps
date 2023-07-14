const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: [true, 'Mohon isi nama paket internet'],
    },
    packageDescription: {
      type: String,
      required: [true, 'Mohon isi deskripsi paket internet'],
    },
    packagePrice: {
      type: Number,
      required: [true, 'Mohon isi harga paket internet'],
    },
    packageImage: String,
    packageType: {
      type: String,
      enum: ['Yearly', 'Monthly'],
      required: [true, 'Mohon isi tipe paket internet'],
    },
    packageNextPayment: Date,
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

packageSchema.pre(/^find/, function (next) {
  this.populate('purchasedBy').populate({
    path: 'purchasedBy',
    select: 'firstName lastName emailAddress nomorHP profileImage',
  });

  next();
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
