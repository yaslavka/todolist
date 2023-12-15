const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const {UserModels} = require("../../Models/UserModels");
const {TaskModel} = require("../../Models/TaskModel");

class TaskControllers {
    async task(req, res){
        const {pages, count}=req.query
        const limit = parseInt(count)
        const page = parseInt(pages) || 1;
        const offset = (page - 1) * limit;
        let task =await TaskModel.findAll({limit:limit, offset:offset, include:[{model: UserModels, as: 'user'}]})
        if (!task.length){
            return res.status(409).json({message: 'Задачи отсутствуют'})
        }else {
            let taskUser =await TaskModel.findAll()
            const users = await UserModels.findAll({where:{id: taskUser.map(user=>user.userId)}})
            const totalCount = await TaskModel.count();
            const totalPages = Math.ceil(totalCount / limit);
            return res.status(200).json({task, totalPages, users})
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
    async taskFilter(req, res){
        const {pages, count, status, foolName, email}=req.query
        const page = parseInt(pages) || 1;
        const limit = parseInt(count)
        const offset = (page - 1) * limit;
        if (!foolName && !email && status === undefined){
            let allTask =await TaskModel.findAll({limit:limit, offset:offset, include:[{model: UserModels, as: 'user'}]})
            if (!allTask.length){
                return res.status(409).json({message: 'Фильткр сброшен'})
            }else {
                let taskUser =await TaskModel.findAll()
                const users = await UserModels.findAll({where:{id: taskUser.map(user=>user.userId)}})
                const totalCount = await TaskModel.count();
                const totalPages = Math.ceil(totalCount / limit);
                return res.status(200).json({task:allTask, totalPages, users})
            }
        }else if(status !== undefined && foolName && email){
            let taskFilter = await TaskModel.findAll({limit:limit, offset:offset, where:{[Op.or]:[{status: status}]}, include:[{model: UserModels, as: 'user', where:{[Op.or]: [{ foolName: foolName }, { email: email }]}}]})
            if (!taskFilter.length){
                return res.status(409).json({message: ''})
            }else {
                let taskUser =await TaskModel.findAll()
                const totalCount = await TaskModel.count();
                const totalPages = Math.ceil(totalCount / limit);
                const users = await UserModels.findAll({where:{id: taskUser.map(user=>user.userId)}})
                return res.status(200).json({task:taskFilter, totalPages, users})
            }
        }else if (status !== undefined && !foolName && !email){
            let taskStatus =await TaskModel.findAll({limit:limit, offset:offset, where:{status:status}, include:[{model: UserModels, as: 'user'}]})
            if (!taskStatus.length){
                return res.status(409).json({message: 'Задачи Ненайдены'})
            }else {
                let taskUser =await TaskModel.findAll()
                const totalCount = await TaskModel.count();
                const totalPages = Math.ceil(totalCount / limit);
                const users = await UserModels.findAll({where:{id: taskUser.map(user=>user.userId)}})
                return res.status(200).json({task:taskStatus, totalPages, users})
            }
        }else if (foolName && status !== undefined && !email){
            let taskFoolName =await TaskModel.findAll({limit:limit, offset:offset, where:{status:status}, include:[{model: UserModels, as: 'user', where: {foolName:foolName}}]})
            if (!taskFoolName.length){
                return res.status(409).json({message: 'Задачи с таким пользователем не найдены'})
            }else {
                let taskUser =await TaskModel.findAll()
                const totalCount = await TaskModel.count();
                const totalPages = Math.ceil(totalCount / limit);
                const users = await UserModels.findAll({where:{id: taskUser.map(user=>user.userId)}})
                return res.status(200).json({task:taskFoolName, totalPages, users})
            }
        }else if (email && status !== undefined && !foolName){
            let taskEmail=await TaskModel.findAll({limit:limit, offset:offset, where:{status:status}, include:[{model: UserModels, as: 'user', where: {emil:email}}]})
            if (!taskEmail.length){
                return res.status(409).json({message: 'Задачи с таким Email не найдены'})
            }else {
                let taskUser =await TaskModel.findAll()
                const totalCount = await TaskModel.count();
                const totalPages = Math.ceil(totalCount / limit);
                const users = await UserModels.findAll({where:{id: taskUser.map(user=>user.userId)}})
                return res.status(200).json({task:taskEmail, totalPages, users})
            }

        }else if (status === undefined && !email && foolName){
            let name =await TaskModel.findAll({limit:limit, offset:offset, include:[{model: UserModels, as: 'user', where: {foolName:foolName}}]})
            if (!name.length){
                return res.status(409).json({message: 'Такой пользователь не найден'})
            }else {
                let taskUser =await TaskModel.findAll()
                const totalCount = await TaskModel.count();
                const totalPages = Math.ceil(totalCount / limit);
                const users = await UserModels.findAll({where:{id: taskUser.map(user=>user.userId)}})
                return res.status(200).json({task:name, totalPages, users})
            }
        }else if (status === undefined && email && !foolName){
            let taskEmail=await TaskModel.findAll({limit:limit, offset:offset, include:[{model: UserModels, as: 'user', where: {emil:email}}]})
            if (!taskEmail.length){
                return res.status(409).json({message: 'Такой Email Не найден'})
            }else {
                let taskUser =await TaskModel.findAll()
                const totalCount = await TaskModel.count();
                const totalPages = Math.ceil(totalCount / limit);
                const users = await UserModels.findAll({where:{id: taskUser.map(user=>user.userId)}})
                return res.status(200).json({task:taskEmail, totalPages, users})
            }
        }
    }
}
module.exports = new TaskControllers()