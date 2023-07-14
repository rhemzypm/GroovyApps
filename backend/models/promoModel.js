const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  promoTitle: {
    type: String,
    require: [true, 'Mohon isi judul promo'],
  },
  promoContent: {
    type: String,
    require: [true, 'Mohon isi deskripsi promo'],
  },
  promoImage: {
    type: String,
    require: [true, 'Mohon isi gambar promo'],
    default: 'uploads/promos/default.jpeg',
  },
});

const Promo = mongoose.model('Promo', promoSchema);

module.exports = Promo;
