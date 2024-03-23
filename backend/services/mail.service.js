// Import nodemailer module
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',  // Your Gmail email address
        pass: 'your_password'           // Your Gmail password
    }
});

// Create an email message
let mailOptions = {
    from: 'your_email@gmail.com',     // Sender email address
    to: 'recipient_email@example.com', // Recipient email address
    subject: 'Test Email',             // Subject line
    text: 'This is a test email.'     // Plain text body
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error occurred:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
