const TodoController = require('./todo');

class HomeController {
    static main(req, res) {
        res.send('Homepage');
    }
}

module.exports = {HomeController, TodoController};