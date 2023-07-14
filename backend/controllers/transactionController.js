const Xendit = require('xendit-node');
const { v4: uuidv4 } = require('uuid');

const Package = require('../models/packageModel');
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');
const AppError = require('../utils/appError');

const xendit = new Xendit({ secretKey: process.env.XENDIT_API_KEY });

exports.checkoutProduct = catchAsync(async (req, res, next) => {
  const { packageId } = req.params;

  // get user
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // get package
  const existedPackage = await Package.findById(packageId);

  if (!existedPackage) {
    return next(new AppError('Package not found', 404));
  }

  const transactionId = uuidv4();

  const transaction = new Transaction({
    transactionId,
    package: existedPackage._id,
    user: user._id,
    payerEmail: user.emailAddress,
    amount: existedPackage.packagePrice,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await transaction.save({ validateBeforeSave: false });

  // generate payment link with xendit
  const { Invoice } = xendit;
  const invoiceOptions = {};
  const i = new Invoice(invoiceOptions);

  i.createInvoice({
    externalID: transactionId,
    payerEmail: user.emailAddress,
    description: `Purchase for ${existedPackage.packageName}`,
    currency: transaction.currency,
    amount: existedPackage.packagePrice,
    invoiceDuration: 24,
    forUserID: user._id,
  })
    .then((id) => {
      res.status(200).json({
        status: 0,
        msg: `Invoice created with ID: ${id}`,
      });
    })
    .catch((err) => {
      console.log('Failed to create invoice', err);
      return next(new AppError('Failed to create invoice', 500));
    });
});

exports.createPurchaseTransaction = catchAsync(async (req, res, next) => {
  const { packageId } = req.params;

  // get user
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // get package
  const existedPackage = await Package.findById(packageId);

  if (!existedPackage) {
    return next(new AppError('Package not found', 404));
  }

  const transactionId = uuidv4();

  const { Payout } = xendit;
  const payoutSpecificOptions = {};
  const p = new Payout(payoutSpecificOptions);

  const paymentDetails = {
    externalID: transactionId,
    amount: existedPackage.packagePrice,
    currency: 'IDR',
    email: user.emailAddress,
    description: `Payment for ${existedPackage.packageName}`,
  };

  // create an invoice
  p.createPayout(paymentDetails).then(({ id }) => {
    console.log(`Invoice created with id: ${id}`);
  });

  const transaction = new Transaction({
    transactionId,
    package: existedPackage._id,
    user: user._id,
    payerEmail: user.emailAddress,
    amount: existedPackage.packagePrice,
    paymentStatus: 'process',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await transaction.save();

  return res.status(201).json({
    status: 0,
    msg: 'You have successfully made a transaction',
    data: transaction,
  });
});

exports.getAllTransactions = factory.getAll(
  Transaction,
  'Berhasil mengakses data transaksi'
);

exports.getTransaction = factory.getOne(
  Transaction,
  { path: '_id' },
  'Berhasil mengakses data transaksi'
);

// exports.createTransaction = factory.createOne(
//   Transaction,
//   'You have successfully made your transaction'
// );

exports.updateTransaction = factory.updateOne(
  Transaction,
  'Berhasil mengubah data transaksi'
);

exports.deleteTransaction = factory.deleteOne(
  Transaction,
  'Berhasil menghapus data transaksi'
);
