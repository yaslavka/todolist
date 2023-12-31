const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const {UserModels} = require("../../Models/UserModels");
const {TaskModel} = require("../../Models/TaskModel");

class TaskControllers {
    async task(req, res){
        let allTask =await TaskModel.findAll({include:[{model: UserModels, as: 'user'}]})
        if (!allTask.length){
            return res.status(409).json({message: 'Нет заданий'})
        }else {
            let taskUser =await TaskModel.findAll()
            const users = await UserModels.findAll({where:{id: taskUser.map(user=>user.userId)}})
            return res.status(200).json({task:allTask, users})
        }

    }
    async addTask(req, res){
        const {task, name, email, phone}=req.body
        const { authorization } = req.headers;
        if(!authorization){
            const authUser = await UserModels.findOne({where:{email:email}})
            if (authUser){
                await TaskModel.create({
                    task:task,
                    userId: authUser.id
                })
                return res.status(200).json({message: 'Задача успешно добавленна'})
            }else {
                const user = await UserModels.create({
                    foolName: name,
                    phone: phone,
                    email: email,
                })
                await TaskModel.create({
                    task:task,
                    userId: user.id
                })
                return res.status(200).json({message: 'Задача успешно добавленна'})
            }
        }else {
            return res.status(409).json({message: 'не предвиденная ошибка'})
        }
    }
    async addTaskAuth(req, res){
        const {task}=req.body
        const { authorization } = req.headers;
        if (!authorization){
            return res.status(409).json({message: 'Ненайден айди пользователя'});
        }else {
            const token = authorization.slice(7);
            const { email } = jwt.decode(token);
            let user = await UserModels.findOne({ where: { email:email } });
            if (!user){
                return res.status(409).json({message: 'Ошибка данных'});
            }else {
                await TaskModel.create({
                    task:task,
                    userId: user.id
                })
                return res.status(200).json({message: 'Задача успешно добавленна'})
            }
        }
    }
    async taskStatus(req, res){
        const {id,status}=req.body
        const task =await TaskModel.findOne({where:{id:id}})
        if (task){
            await TaskModel.update({status:status}, {where: {id: task.id}})
            return res.status(200).json({message: 'Задача успешно Обновленна'})
        }else {
            return res.status(409).json({message: 'Ошибка данных'})
        }
    }
    async taskEdit(req, res){
        const {task, id}=req.body
        const tasks =await TaskModel.findOne({where:{id:id}})
        if (tasks){
            await TaskModel.update({task:task}, {where: {id: tasks.id}})
            return res.status(200).json({message: 'Задача успешно Обновленна'})
        }else {
            return res.status(409).json({message: 'Ошибка Сервера'})
        }
    }
}
module.exports = new TaskControllers()