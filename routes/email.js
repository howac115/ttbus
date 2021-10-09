
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST request to create a snack
router.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <h1>hello maxiu<h1>
    <h3>Message</h3>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "travellingtechybus@gmail.com",
            pass: "chrdwhdhxt"
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'travellingtechybus.com', // sender address
        to: 'matthewk1kk@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.status(200).json({ success: 'Email sent successfull' });
    });
});


module.exports = router;
