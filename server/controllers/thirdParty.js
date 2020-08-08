const axios = require('axios');

class thirdParty {
    static catFact(req, res, next) {
        axios({
                method: 'get',
                url: 'https://cat-fact.herokuapp.com/facts/random',
                params: {
                    animal_type: 'cat',
                    amount: 5
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

    static getRecipe(req, res, next) {
        axios({
                method: 'get',
                url: 'http://www.recipepuppy.com/api/',
                params: {
                    q: req.body.recipeRequested
                }
            })
            .then(result => {
                console.log(result.data.results);
                let listRecipe = []
                result.data.results.forEach(el => {
                    listRecipe.push(el)
                });
                res.status(200).json(listRecipe)
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }
}

module.exports = thirdParty