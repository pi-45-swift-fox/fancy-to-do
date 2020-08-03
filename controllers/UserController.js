const { User } = require('../models')
const bcrypt = require('bcryptjs')


class UserController {
    static async register(req, res) {
        try {
            const { email, password } = req.body
            const result = await User.create({
                email,
                password
            })
            res.status(201).json({
                id: result.id,
                email: result.email,
                password: result.password
            })

        } catch {
            res.status(400).json('errors')
        }

    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            const check = await User.findOne({
                where: {
                    email
                }
            })
            if (check == null || check == 0) {
                res.status(400).json('invalid email or password')
            } else {
                const result = bcrypt.compareSync(password, check.password)
                if (!result) {
                    res.status(400).json('invalid email or password')
                } else if (result) {
                    // console.log({ id: check.id, email: check.email });
                    const token = jwt.sign({ id: check.id, email: check.email }, process.env.JWT_SECRET)
                    res.status(200).json({ token })
                }

            }
        } catch {

        }
    }
}

module.exports = UserController