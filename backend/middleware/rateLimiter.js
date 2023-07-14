const rateLimit = require('express-rate-limit');
const AppError = require('../utils/appError');

const resendOTPRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 3, // batasan untuk IP menjadi 3 permintaan kirim ulang OTP
  handler: function (req, res, next) {
    return next(
      new AppError(
        'Maaf, Anda sudah mengirim ulang untuk e-mail yang berisi OTP sebanyak 3 kali, silakan coba lagi untuk 24 jam',
        429
      )
    );
  },
  headers: true,
});

const verifyOTPRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 3, // batasan untuk IP menjadi 3 permintaan kirim ulang OTP
  handler: function (req, res, next) {
    return next(
      new AppError(
        'Maaf, Anda gagal mencoba verifikasi OTP sebanyak 3 kali, mohon dicoba lagi dalam 24 jam',
        429
      )
    );
  },
  headers: true,
});

module.exports = { resendOTPRateLimiter, verifyOTPRateLimiter };
