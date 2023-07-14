const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// delete one
exports.deleteOne = (Model, message) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    // memeriksa jika tidak ditemukan
    if (!doc) {
      return next(
        new AppError('Tidak ada dokumen ditemukan dengan ID itu', 404)
      );
    }

    // mengirim response
    res.status(204).json({
      status: 0,
      msg: message,
      data: [],
    });
  });

// update one
exports.updateOne = (Model, message) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError('Tidak ada dokumentasi yang ditemukan dengan ID', 404)
      );
    }

    // send response
    res.status(200).json({
      status: 0,
      msg: message,
      data: doc,
    });
  });

// create one
exports.createOne = (Model, message) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    // mengirimkan response
    res.status(201).json({
      status: 0,
      msg: message,
      data: doc,
    });
  });

// get all
exports.getAll = (Model, message) =>
  catchAsync(async (req, res, next) => {
    // to allow for nested GET reviews on fields
    let filter = {};

    // nested get endpoint (NANTI)
    if (req.params.userId) filter = { user: req.params.userId };

    // eksekusi query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    // mengirim response
    res.status(200).json({
      status: 0,
      msg: message,
      results: doc.length,
      data: doc,
    });
  });

// get one
exports.getOne = (Model, popOptions, message) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(
        new AppError('Tidak ada dokumentasi yang ditemukan dengan ID', 404)
      );
    }

    // send response
    res.status(200).json({
      status: 0,
      msg: message,
      data: doc,
    });
  });
