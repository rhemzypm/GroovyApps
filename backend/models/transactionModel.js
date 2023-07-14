const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  package: {
    type: mongoose.Schema.ObjectId,
    ref: 'Package',
    required: [true, 'Transaction harus ada di package'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Transaction harus ada di user'],
  },
  currency: {
    type: String,
    default: 'IDR',
  },
  amount: {
    type: Number,
    required: [true, 'Transaction harus ada harga'],
  },
  paymentStatus: {
    type: String,
    enum: ['process', 'done'],
    default: 'process',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

transactionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName emailAddress nomorHP',
  }).populate({
    path: 'package',
    select: 'packageName',
  });
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
