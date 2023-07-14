# Groovy API

## Cara menjalankan REST API:

- Pastikan Anda menginstall Postman sebelumnya menguji coba REST API
- Jika Postman sudah terinstall, buka terminal Anda, dan ketik:

  ```
    git clone https://github.com/chelseaoktaviany/groovy-app-backend.git
  ```

- Setelah itu, buat file `config.env` di root directory (backend) dan ketik:

  ```
    NODE_ENV=development
    PORT=YOUR_PORT

    #mongodb
    DATABASE=YOUR_MONGODB_DATABASE_URL
    DATABASE_LOCAL=YOUR_MONGODB_DATABASE_LOCAL_URL
    DATABASE_USERNAME=YOUR_MONGODB_DB_USERNAME
    DATABASE_PASSWORD=YOUR_MONGODB_DB_PASSWORD

    #jwt token
    JWT_SECRET=YOUR_JWT_TOKEN
    JWT_EXPIRES_IN=90d
    JWT_COOKIE_EXPIRES_IN=90

    #email dev
    EMAIL_FROM_DEV=YOUR_EMAIL_DEV
    EMAIL_FROM_PROD=YOUR_EMAIL_PROD

    #nodemailer transport (dev)
    EMAIL_HOST_DEV=YOUR_MAILTRAP_HOST
    EMAIL_PORT_DEV=YOUR_MAILTRAP_PORT
    EMAIL_USERNAME_DEV=YOUR_MAILTRAP_USERNAME
    EMAIL_PASSWORD_DEV=YOUR_MAILTRAP_PASSWORD

    #nodemailer transport (prod)
    SENDINBLUE_USERNAME=YOUR_SENDINBLUE_USERNAME
    SENDINBLUE_PASSWORD=YOUR_SENDINBLUE_PASSWORD

    #xendit payment gateway
    XENDIT_API_KEY=YOUR_XENDIT_API_KEY
    XENDIT_PUBLIC_KEY=YOUR_XENDIT_PUBLIC_KEY
    XENDIT_CALLBACK_TOKEN=YOUR_XENDIT_CALLBACK_TOKEN
  ```

- Setelah itu, lakukan install beberapa _package_ dengan ketik:
  ```
  npm install
  ```
- Jika beberapa _package_ yang sudah terinstall, jalankan:

  ```
  npm run start:dev
  ```

- Buka Postman, pilih HTTP method `POST`, kemudian ketik `http://localhost:5000/v1/users/signUp`
- Lakukan uji coba dengan mengisi data menggunakan `raw json`
- Setelah itu, pilih tombol `Send`
