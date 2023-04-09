const nodemailer = require('nodemailer');

const transporterMail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rathorepawan13@gmail.com', 
      pass: 'fnkolazhpwvlstyh'
    },
    tls: {
        rejectUnauthorized: false
      }
  });

  module.exports = {transporterMail}; 