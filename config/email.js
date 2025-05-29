
const nodemailer = require('nodemailer');

// Email transporter configuration with your Gmail credentials
const createEmailTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'mysteriousmee@gmail.com', // Your Gmail address
      pass: '_january252004_' // Your Gmail password
    }
  });
};

module.exports = { createEmailTransporter };
