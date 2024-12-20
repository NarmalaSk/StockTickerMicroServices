require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sendEmail } = require('./emailService');
const { startPeriodicEmails } = require('./periodicEmailService');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve homepage
app.use(express.static('public'));

// Route for sending emails on demand
app.post('/send-email', async (req, res) => {
    const { toEmail, subject, message } = req.body;
    await sendEmail(toEmail, subject, message);
    res.status(200).send('Email sent successfully!');
});

// Route for handling periodic email requests
app.post('/start-periodic-emails', (req, res) => {
    const { email, stockSymbol, interval } = req.body;
    startPeriodicEmails(email, stockSymbol, interval);
    res.status(200).send(`Started sending periodic emails for ${stockSymbol} to ${email} every ${interval} minutes.`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
