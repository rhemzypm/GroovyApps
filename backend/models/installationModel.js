const mongoose = require('mongoose');

const installationSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: [true, 'Mohon isi lokasi'],
    },
    name: {
      type: String,
      required: [true, 'Mohon isi nama Anda'],
    },
    nomorHP: {
      type: String,
      required: [true, 'Mohon isi nomor HP pelanggan'],
    },
    detailedAddress: {
      type: String,
      required: [true, 'Mohon isi alamat secara detail'],
    },
  },
  { versionKey: false }
);

const Installation = mongoose.model('Installation', installationSchema);

module.exports = Installation;
