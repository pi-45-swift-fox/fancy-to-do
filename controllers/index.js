const TodoController = require('./todo');
const UserController = require('./user');

class HomeController {
    static main(req, res) {
        res.send('Homepage');
    }
}

module.exports = { HomeController, TodoController, UserController };