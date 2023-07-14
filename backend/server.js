const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception! Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

// menggunakan dotenv config
dotenv.config({ path: './config.env' });

// menggunakan app.js
const app = require('./app');

// menyambungkan ke mongoose
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);

mongoose
  .connect(DB, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection established');
  })
  .catch((err) => {
    throw err;
  });

// server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`The server is listening on ${port}`);
});

// handle unexpection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// sigterm unexpection
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down..');
  server.close(() => {
    console.log('Process terminated. 💀');
  });
});
