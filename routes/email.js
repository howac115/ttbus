
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST request to create a snack
router.post('/send', (req, res) => {

    console.log(req.query)
    console.log(req.body)
    const output = `
    <h1>${req.body.subject}</h1>
    <h3>${req.body.text}</h3>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 225,
        auth: {
            user: "travellingtechybus@gmail.com",
            pass: "chrdwhdhxt"
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'travellingtechybus@gmail.com', // sender address
        to: req.query.email, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
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
