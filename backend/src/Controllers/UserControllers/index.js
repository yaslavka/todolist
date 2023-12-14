const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModels } = require("../../Models/UserModels");
const decode = 'random_key'
const generateJwt = (id, email, fullName, phone) => {
    return jwt.sign({ id: id, email: email, fullName: fullName, phone: phone }, decode);
};

class UserController{
    async registration(req, res) {
        const { email, username, password, fullName, phone } = req.body;
        if (!email || !password || !username) {
            return res.status(409).json({ message: "Не все поля заполнены" })
        } else {
            try {
                const candidateUsername = await UserModels.findOne({ where: { username: username } })
                const candidateEmail = await UserModels.findOne({ where: { email: email } })
                const candidatePhone = await UserModels.findOne({ where: { phone: phone } })
                if (candidatePhone){
                    return res.status(409).json({ message: "Такой номер телефона уже существует" })
                }else if (candidateUsername) {
                    return res.status(409).json({ message: "Такой username уже существует" })
                } else if (candidateEmail) {
                    return res.status(409).json({ message: "Такой email уже существует" })
                } else {
                    const hashPassword = await bcrypt.hash(password, 5);
                    const user = await UserModels.create({
                        username: username,
                        email: email,
                        password: hashPassword,
                        fullName:fullName,
                        phone:phone
                    })
                    const access_token = generateJwt(
                        user.id,
                        user.email,
                        user.fullName,
                        user.phone
                    )
                    return res.status(200).json(access_token)
                }
            } catch (error) {
                return res.status(500).json(error)
            }
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserModels.findOne({ where: { email: email } });
            if (!user) {
                return res.status(409).json({ message: "Не верный Email" })
            } else {
                let comparePassword = bcrypt.compareSync(password, user.password);
                if (!comparePassword) {
                    return res.status(409).json({ message: "Неверный пароль" })
                } else {
                    const access_token = generateJwt(
                        user.id,
                        user.email,
                        user.fullName,
                        user.phone,
                    );
                    return res.status(200).json(access_token);
                }
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async loginAdmin(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserModels.findOne({ where: { email: email, isAdmin: true } });
            if (!user) {
                return res.status(409).json({ message: "Email Не пренадлежит администратору" })
            } else {
                let comparePassword = bcrypt.compareSync(password, user.password);
                if (!comparePassword) {
                    return res.status(409).json({ message: "Неверный пароль" })
                } else {
                    const access_token = generateJwt(
                        user.id,
                        user.email,
                        user.fullName,
                        user.phone,
                    );
                    return res.status(200).json(access_token);
                }
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async user(req, res){
        try {
            const { authorization } = req.headers;
            if(!authorization){
                return res.status(409).json({ message: 'Вы не авторизованы' });
            }else {
                const token = authorization.slice(7);
                const { email } = jwt.decode(token);
                let user = await UserModels.findOne({ where: { email:email } });
                if (!user) {
                    return res.status(409).json({ message: 'Такой пользователь не найден' });
                }else {
                    return res.status(200).json(user);
                }
            }
        }catch (error){
            return res.status(500).json(error);
        }
    }
}
module.exports = new UserController();