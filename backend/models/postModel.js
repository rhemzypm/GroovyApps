const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    require: [true, 'Mohon isi judul post'],
  },
  postDescription: {
    type: String,
    require: [true, 'Mohon isi deskripsi post'],
  },
  postImage: {
    type: String,
    require: [true, 'Mohon isi gambar post'],
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
