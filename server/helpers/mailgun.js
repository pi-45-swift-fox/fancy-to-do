require("dotenv").config();

const api_key = process.env.MAILGUN_APIKEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

function mailSent(data) {
    console.log('>>', data.data.dataValues, 'ini di mailgun');
    let tes = {
        from: 'adekferdian2@gmail.com',
        to: data.user.email,
        subject: `You successfully create Todo : ${data.data.dataValues.title}`,
        text: `
        Here's below your description Todo :  ${data.data.dataValues.description}
        your Due Date Todo on : ${data.data.dataValues.Due_date}
       
    `
    };

    return mailgun.messages().send(tes, function (error, body) {
        console.log(error, 'ini error');
        console.log(body, 'succes dong!');
    });
}

module.exports = mailSent