require('dotenv').config()

class MailController {
    static sent(req, res, next) {
        // console.log(req.body, 'masuk bre');
        let email = req.body.data
        let title = req.body.title
        const api_key = process.env.MAILGUN_APIKEY;
        console.log(api_key);
        const domain = process.env.MAILGUN_DOMAIN;
        const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

        function mailSent(data) {
            console.log('>>', data, 'ini di fynction');
            let tes = {
                from: 'adekferdian2@gmail.com',
                to: data.email,
                subject: `You Has been Invited By : ${data.email}`,
                text: `
                Todo title :  ${data.title}            
            `
            };
            return mailgun.messages().send(tes, function (error, body) {
                console.log(error, 'ini error');
                console.log(body, 'succes dong!');
            });
        }
        mailSent({
            email,
            title
        })
    }
}

module.exports = MailController