const mailjet = require('node-mailjet').connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);

const sendEmail = async (toEmail, subject, message) => {
    try {
        const request = await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [{
                From: {
                    Email: process.env.FROM_EMAIL,
                    Name: "Stock Tracker",
                },
                To: [{ Email: toEmail, Name: "User" }],
                Subject: subject,
                TextPart: message,
            }],
        });

        if (request.response.status === 200) {
            console.log('Email sent successfully!');
        } else {
            console.error('Failed to send email');
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
