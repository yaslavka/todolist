const {DataTypes} = require("sequelize");
const sequelize = require("../../../db");

const UserModels = sequelize.define('user', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11},
    username: {type: DataTypes.STRING, defaultValue: null},
    foolName: {type: DataTypes.STRING, defaultValue: null},
    phone: {type: DataTypes.STRING, defaultValue: null},
    email: {type: DataTypes.STRING, defaultValue: null},
    password: {type: DataTypes.STRING, defaultValue: null},
    avatar: {type: DataTypes.STRING, defaultValue: null},
    isAdmin:{type: DataTypes.BOOLEAN, defaultValue: false},
})
module.exports = {UserModels}