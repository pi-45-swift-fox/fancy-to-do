const axios = require('axios');

class thirdParty {
    static catFact(req, res, next) {
        axios({
                method: 'get',
                url: 'https://cat-fact.herokuapp.com/facts/random',
                params: {
                    animal_type: 'cat',
                    amount: 2
                }
            })
            .then(response => {
                let facts = []
                response.data.forEach(el => {
                    facts.push(el.text)
                });
                res.status(200).json({ facts })
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }
}

module.exports = thirdParty