const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema(
  {
    point: {
      type: Number,
      default: 0,
      require: [true, 'Mohon isi point'],
    },
    balance: {
      type: Number,
      default: 0,
      require: [true, 'Mohon isi saldo'],
    },
    currencyPoint: {
      type: String,
      default: 'GP',
    },
    currencyBalance: {
      type: String,
      default: 'IDR',
    },
    // // user: {
    // //   type: mongoose.Schema.Types.ObjectId,
    // //   ref: 'User',
    // //   require: [true, 'Point is belonging to a user'],
    // default: undefined,
    // // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

// pointSchema.pre(/^find/, function (next) {
//   this.populate('user').populate({
//     path: 'user',
//     select: 'firstName lastName point',
//   });

//   next();
// });

const Point = mongoose.model('Point', pointSchema);

module.exports = Point;
