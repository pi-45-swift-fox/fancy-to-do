const sendEmail = (email, message) => {
    const mailgunApiKey = process.env.MAILGUN_API_KEY;
    const mailgunDomain = process.env.MAILGUN_DOMAIN;

    const mailgun = require('mailgun-js')({apiKey: mailgunApiKey, domain: mailgunDomain});

    const data = {
        from: 'FancyTodo <not-reply@f-todo.mailgun.org>',
        to: email,
        subject: 'Hello, Welcome to Fancy todo App',
        text: message
    };

    mailgun.messages().send(data, (error, body) => {
        error ? console.log(error) : console.log(body);
    })
}

module.exports = {sendEmail};