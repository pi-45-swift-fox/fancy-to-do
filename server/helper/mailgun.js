var apiKey = process.env.API_KEY;
var domain = process.env.DOMAIN;
var mailgun = require('mailgun-js')({apiKey, domain});

module.exports = (email, todoData, option) => {
  console.log(email, todoData, option);
  const data = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: `${option} ${todoData.title} - Todo App`,
    html: `<h1>You just ${option} a todo</h1>`
  };

  console.log(data, 'in mailgun.js');
  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
};
