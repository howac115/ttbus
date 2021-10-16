
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST request to create a snack
router.post('/send', (req, res) => {

    let output = ``

    if (req.body.type == 'create') {
        output = `
        <h1>${req.body.subject}</h1>
        <h3>${req.body.text}</h3>
        <h3>Address: ${req.body.address}</h3>
        <h3>School Type: ${req.body.schoolType}</h3>
        <h4>Message: ${req.body.message}</h4>
      `;
    } else if (req.body.type == 'confirm') {
        output = `
        <h1>${req.body.subject}</h1>
        <h3>${req.body.text}</h3>
        <h3>Address: ${req.body.address}</h3>
        <h3>School Type: ${req.body.schoolType}</h3>
        <h5>Message: ${req.body.message}</h5>
      `;
    } else if (req.body.type == 'cancel') {
        output = `
        <h1>${req.body.subject}</h1>
        <h3>${req.body.text}</h3>
        <h3>Expression of Interest Acceptance ID: ${req.body.interestID}</h3>
        <h3>Address: ${req.body.address}</h3>
        <h3>School Type: ${req.body.schoolType}</h3>
        <h3>Participate in Special Activities? ${req.body.specialAct}</h3>
        <h3>Total Students: ${req.body.totalStudents}</h3>
        <h3>Cost Per Student: 30</h3>
        <h3>Total Cost: ${req.body.totalCost}</h3>
        <h4>From ${req.body.startDate} to ${req.body.endDate}</h4>
        <h4>Reason for Cancellation: ${req.body.reasonForCancellation}</h4>
      `;
    }

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
