'use strict';
const {
    Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Todo)
        }
    };
    User.init({
        email: {
            type: DataTypes.STRING,
            notNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please input valid email'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkPassword(value) {
                    if (value.length < 7) throw new Error('Password minimum 6 characters!')
                },
                notNull: {
                    msg: "Please input due date for your todo list!"
                },
                notEmpty: {
                    msg: "Please input due date for your todo list!"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'User',
    });

    User.addHook('beforeCreate', (user, options) => {
        const encryptedPassword = bcrypt.hashSync(user.password, 10)
        user.password = encryptedPassword
    })
    return User;
};