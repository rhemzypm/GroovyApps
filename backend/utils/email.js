const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.emailAddress;
    this.firstName = user.firstName;
    this.otp = user.otp;
    this.url = url;
    this.from =
      process.env.NODE_ENV === 'production'
        ? `admin <${process.env.EMAIL_FROM_PROD}>`
        : `admin <${process.env.EMAIL_FROM_DEV}>`;
  }

  newTransport() {
    // prod
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        // sendinblue
        service: 'SendinBlue',
        auth: {
          user: process.env.SENDINBLUE_USERNAME,
          pass: process.env.SENDINBLUE_PASSWORD,
        },
      });
    }

    // dev
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST_DEV,
      port: process.env.EMAIL_PORT_DEV,
      secure: false,
      logger: true,
      auth: {
        user: process.env.EMAIL_USERNAME_DEV,
        pass: process.env.EMAIL_PASSWORD_DEV,
      },
    });
  }

  async send(template, subject) {
    // mengirim e-mail yang asli
    // 1) render HTML berdasarkan sebuah pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      otp: this.otp,
      subject,
    });

    // 2) mendefinisikan opsi email
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) membuat transport dan mengirim e-mail
    await this.newTransport().sendMail(mailOptions);
  }

  // untuk admin
  async sendWelcome() {
    await this.send('welcome', 'Welcome to the admin dashboard in Groovy App!');
  }

  // untuk otp
  async sendOTPEmail() {
    await this.send(
      'sendOTP',
      'Verifikasi OTP Anda (Hanya berlaku selama 5 menit)'
    );
  }
};
