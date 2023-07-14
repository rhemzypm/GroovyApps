const factory = require('./handleFactory');

const Installation = require('../models/installationModel');

exports.getAllInstallations = factory.getAll(
  Installation,
  'Retrieved data area installations successfully'
);

exports.createInstallation = factory.createOne(
  Installation,
  'Berhasil menambahkan data area instalasi'
);

exports.getInstallation = factory.getOne(
  Installation,
  { path: '_id' },
  'Retrieved data area installation successfully'
);
