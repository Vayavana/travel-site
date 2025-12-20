const express = require("express");
const sendMail = require("./sendMail");
const dotenv = require("dotenv");
const cors = require("cors");

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

  try {
    await sendMail({ name, email, message });
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
