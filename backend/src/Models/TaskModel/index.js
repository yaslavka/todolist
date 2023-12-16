const {DataTypes} = require("sequelize");
const sequelize = require("../../../db");
const {UserModels} = require("../UserModels");

const TaskModel = sequelize.define('task', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: 11},
    task: {type: DataTypes.TEXT, allowNull: false},
    status:{type: DataTypes.BOOLEAN, defaultValue: false},
    userId:{type: DataTypes.BIGINT, defaultValue: null},
})
UserModels.hasMany(TaskModel, {as: "task"});
TaskModel.belongsTo(UserModels, {as: 'user'});
module.exports = {TaskModel}