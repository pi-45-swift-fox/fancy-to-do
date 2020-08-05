const nodemailer = require('nodemailer');

module.exports = async (email, data, options) => {
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
    subject: `${options} a todo list with id of ${data.id}`,
    text: "Hello world!",
    html: `<h5>${options} a todo list</h5>
<ul>
  <li>${data.title}</li>
  <li>${data.description}</li>
  <li>${data.status}</li>
  <li>${data.due_date}</li>
</ul>`
  }

  return await transporter.sendMail(mailOption)
};
