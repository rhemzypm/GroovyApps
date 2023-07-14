// packages
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const csp = require('express-csp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

require('dotenv').config({ path: './config.env' });

// memulai aplikasi express
const app = express();

// untuk router & error handling (NANTI)
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// users
const userRouters = require('./routes/userRouters');
const adminRouters = require('./routes/adminRouters');

const packageRouters = require('./routes/packageRouters');
const installationRouters = require('./routes/installationRouters');
const transactionRouters = require('./routes/transactionRouters');
const faqRouters = require('./routes/faqRouters');
const voucherRouters = require('./routes/voucherRouters');
const postRouters = require('./routes/postRouters');
const promoRouters = require('./routes/promoRouters');
const pointRouters = require('./routes/pointRouters');

// trusting proxy
app.enable('trust proxy');

// global middleware

// menyajikan view
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// menggunakan cors
app.use(cors());

app.options('*', cors());

// menyajikan static public
const dirname = path.resolve();
app.use('/v1/ga/uploads', express.static(path.join(dirname, 'uploads')));

// set security http headers
app.use(helmet());

csp.extend(app, {
  policy: {
    directives: {
      'default-src': ['self'],
      'style-src': ['self', 'unsafe-inline', 'https:'],
      'font-src': ['self', 'https://fonts.gstatic.com'],
      'script-src': [
        'self',
        'unsafe-inline',
        'data',
        'blob',
        'https://*.cloudflare.com/',
        // 'https://bundle.js:8828',
        `http://localhost:${process.env.PORT}/`,
        'http://localhost:3000/',
      ],
      'worker-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        'https://*.cloudflare.com/',
        // 'https://bundle.js:*',
        `http://localhost:${process.env.PORT}/`,
        'http://localhost:3000/',
      ],
      'frame-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        'https://*.cloudflare.com/',
        // 'https://bundle.js:*',
        `http://localhost:${process.env.PORT}/`,
        'http://localhost:3000/',
      ],
      'img-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        'https://*.cloudflare.com/',
        // 'https://bundle.js:*',
        `http://localhost:${process.env.PORT}/`,
        'http://localhost:3000/',
      ],
      'connect-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        // 'wss://<HEROKU-SUBDOMAIN>.herokuapp.com:<PORT>/',
        'https://*.cloudflare.com/',
        // 'https://bundle.js:*',
        `http://localhost:${process.env.PORT}/`,
        'http://localhost:3000/',
      ],
    },
  },
});

// logging dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// menggunakan api limiter (NANTI)
const limiter = rateLimit({
  max: 100, // memperbolehkan 100 permintaan dari IP yang sama di setiap jam
  windowMs: 60 * 60 * 1000,
  message:
    'Terlalu banyak request dari IP ini, mohon dicoba lagi di dalam 1 jam',
});

app.use('/v1/ga', limiter);

// using xendit webhook (later)

// menggunakan express body parser
app.use(express.json({ limit: '10kb' }));

// untuk melakukan parse data yang akan datang dari sebuah URL encoded form
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// menggunakan cookie-parser
app.use(cookieParser());

// menggunakan data sanitization untuk melawan NoSQL setiap injection
app.use(mongoSanitize());

// menggunakan data sanitization melawan XSS
app.use(xss());

// mencegah parameter pollution app.use(hpp()); (NANTI)
app.use(hpp({ whitelist: [] }));

// menggunakan compression (NANTI)
app.use(compression());

// middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// api routes
app.use('/v1/ga/users', userRouters);
app.use('/v1/ga/admins', adminRouters);
app.use('/v1/ga/packages', packageRouters);
app.use('/v1/ga/installations', installationRouters);
app.use('/v1/ga/transactions', transactionRouters);
app.use('/v1/ga/faqs', faqRouters);
app.use('/v1/ga/vouchers', voucherRouters);
app.use('/v1/ga/posts', postRouters);
app.use('/v1/ga/promos', promoRouters);
app.use('/v1/ga/points', pointRouters);

// test api
app.get('/', (req, res) => {
  res.status(200).json({
    status: 0,
    msg: 'This API is working',
  });
});

// jika endpoint tidak ditemukan
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Tidak bisa mencari ${req.originalUrl} di server ini!`, 404)
  );
});

// menggunakan error handling middleware
app.use(globalErrorHandler);

module.exports = app;
