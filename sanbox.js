require('dotenv').config();

const nodemailer = require('nodemailer');

module.exports = function (email) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  const mailOption = {
    from: `"Todos app notifications" <${process.env.EMAIL}>`,
    to: email,
    subject: "testing",
    text: "hello bob",
    html: `<p>owidnwidn</p>
    <h1>bob</h1>`
  }

  return transporter.sendMail(mailOption)
}
