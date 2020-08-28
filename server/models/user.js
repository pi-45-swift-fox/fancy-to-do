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
                },
                notEmpty:{
                    msg:'Please input email for register'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkPassword(value) {
                    if (value.length < 6) throw new Error('Password minimum 6 characters!')
                },
                notNull: {
                    msg: "Please input password for register!"
                },
                notEmpty: {
                    msg: "Please input password for register!"
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