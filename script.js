// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'emrecanpolatie@gmail.com',
//     pass: 'btka cdal cdci dkjq'
//   }
// });

// var mailOptions = {
//   from: 'emrecanpolatie@gmail.com',
//   to: 'mervegurses95@gmail.com',
//   subject: 'Aşkım',
//   text: 'Seni seviyorum'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const path = require('path'); // path modülünü ekleyin

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emrecanpolatie@gmail.com',
    pass: 'btka cdal cdci dkjq'
  }
});

// Statik dosyaları servis etmek için middleware ekleyin
app.use(express.static(path.join(__dirname, 'views')));

// Express route for sending emails
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(`Error: ${error.message}`);
    }

    const sentDate = new Date().toLocaleString();
    const successMessage = `Your email was successfully sent to ${mailOptions.to} on ${sentDate}`;

    // Ana ekrana dön butonunu ekleyerek mesajı oluştur
    const responseMessage = `
      ${successMessage}
      <br><br>
      <a href="/">Go back to home</a>
    `;

    res.send(responseMessage);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



