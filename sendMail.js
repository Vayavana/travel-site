const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'opsvayavana@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD // Replace with your Gmail App Password
  }
});

// Send mail function
function sendMail({ name, email, message }) {
  const mailOptions = {
    from: 'opsvayavana@gmail.com',
    to: 'opsvayavana@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = sendMail;
