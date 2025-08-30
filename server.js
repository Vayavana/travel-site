const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received contact form submission:', req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  // Log the contact form submission as backup
  const logEntry = {
    timestamp: new Date().toISOString(),
    name,
    email,
    message,
    ip: req.ip || req.connection.remoteAddress
  };

  try {
    const logFile = path.join(__dirname, 'contact-submissions.log');
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  } catch (logError) {
    console.error('Error logging contact submission:', logError);
  }

  // Attempt to send email
  let emailSent = false;
  let emailError = null;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      timeout: 10000, // 10 second timeout
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Always send to opsvayavana@gmail.com
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    emailSent = true;
    console.log('Email sent successfully');
  } catch (error) {
    emailError = error;
    console.error('Error sending email:', error.message);
  }

  // Always respond with success since we've logged the submission
  if (emailSent) {
    res.json({ success: true, message: 'Message sent successfully!' });
  } else {
    // Email failed but we logged the submission
    res.json({ 
      success: true, 
      message: 'Message received successfully! We will get back to you soon.',
      note: 'Your message has been recorded and our team will respond via email.'
    });
  }
});

// Send email endpoint (used by index.html)
app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;
  console.log('Received email submission:', req.body);

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  // Log the email submission as backup
  const logEntry = {
    timestamp: new Date().toISOString(),
    email,
    message,
    ip: req.ip || req.connection.remoteAddress
  };

  try {
    const logFile = path.join(__dirname, 'email-submissions.log');
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  } catch (logError) {
    console.error('Error logging email submission:', logError);
  }

  // Always respond with success since we've logged the submission
  res.json({ 
    success: true, 
    message: 'Email received successfully! We will get back to you soon.'
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
