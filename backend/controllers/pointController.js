// controllers
const factory = require('./handleFactory');

// utils
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

// models
const Point = require('../models/pointModel');

const convertedCurrency = (point, fromCurrency, toCurrency) => {
  const currency = {
    GP: 1,
    IDR: 13000,
  };

  if (!currency[fromCurrency] || !currency[toCurrency]) {
    throw new Error('Exchange rate not found for provided currency');
  }

  const convertedPoint =
    point * (currency[toCurrency] / currency[fromCurrency]);

  const fixedConvPoint = convertedPoint.toFixed(0);

  return fixedConvPoint;
};

exports.getAllUserPoints = factory.getAll(
  Point,
  "Retrieved all users' point successfully"
);

exports.getUserPoint = factory.getOne(
  Point,
  { path: '_id' },
  "Retrieved user's point successfully"
);

// exports.pushUserPoint = catchAsync(async (req, res, next) => {});

exports.convertPoints = catchAsync(async (req, res, next) => {
  const { changedPoint } = req.body;

  const fixedConvPoint = convertedCurrency(changedPoint, 'IDR', 'GP');

  const point = await Point.create({
    point: fixedConvPoint,
    balance: changedPoint,
  });

  res.status(200).json({
    status: 0,
    msg: 'Berhasil konversi point',
    data: point,
  });
});
