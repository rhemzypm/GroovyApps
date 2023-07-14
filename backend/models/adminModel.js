const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// membuat skema admin
const adminSchema = new mongoose.Schema({
  adminId: { type: String, unique: true },
  name: {
    type: String,
    required: [true, 'Mohon isi nama Anda'],
    trim: true,
  },
  emailAddress: {
    type: String,
    lowercase: true,
    required: [true, 'Mohon isi alamat e-mail Anda'],
    validate: [
      validator.isEmail,
      'Alamat e-mail pengguna harus sesuai dengan format e-mail',
    ],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    // required: [true, 'Mohon isi password Anda'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    // required: [true, 'Mohon isi password konfirmasi Anda'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password tidak sama dengan password konfirmasi Anda',
    },
  },
  passwordChangedAt: Date,
  adminToken: String,
  adminTokenExpires: Date,
  active: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'super-admin'],
    default: 'admin',
  },
  profileImage: {
    type: String,
    default: 'uploads/admins/default.jpeg',
  },
});

// pre middleware
adminSchema.pre('save', async function (next) {
  const admin = this;

  if (!admin.isNew) {
    return next(); // Only generate userId for new users
  }

  try {
    const count = await mongoose.models.Admin.countDocuments();
    admin.adminId = (count + 1).toString(); // Generate userId based on current user count
    next();
  } catch (error) {
    next(error);
  }
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // hash password
  this.password = await bcrypt.hash(this.password, 12);

  // menghapus kolom password confirm
  this.passwordConfirm = undefined;

  next();
});

// method koreksi password
adminSchema.methods.correctPassword = async function (
  candidatePassword,
  adminPassword
) {
  return await bcrypt.compare(candidatePassword, adminPassword);
};

// ganti password
adminSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // console.log(changedTimestamp, JWTTimestamp);

    return JWTTimestamp < changedTimestamp;
  }

  // false dimaksud dengan tidak berubah
  return false;
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
