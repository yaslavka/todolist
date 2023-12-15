require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const sequelize = require("./db");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const multer = require("multer");
const TaskControllers = require('./src/Controllers/TaskControllers')
const UserController = require('./src/Controllers/UserControllers')

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './files/images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/images", express.static(path.resolve(__dirname, "files", "images")));

const server = http.createServer(app);

app.get('/api/task', TaskControllers.task)
app.get('/api/user', UserController.user)
app.post('/api/login', UserController.login)
app.post('/api/register', UserController.registration)
app.post('/api/login_admin', UserController.loginAdmin)
app.post('/api/task_add', TaskControllers.addTask)
app.post('/api/task_auth_add', TaskControllers.addTaskAuth)
app.post('/api/task_status', TaskControllers.taskStatus)
app.post('/api/task_edit', TaskControllers.taskEdit)

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(80, () => console.log(`server started on port 80`));
  }catch (error){
    console.log(error);
  }
}
start().then(r=>r);