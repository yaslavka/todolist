require("dotenv").config();
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();
const sequelize = require("./db");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const TaskControllers = require('./src/Controllers/TaskControllers')
const UserController = require('./src/Controllers/UserControllers')

const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/my-backend.ru/privkey.pem",
    "utf8"
);
const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/my-backend.ru/cert.pem",
    "utf8"
);
const ca = fs.readFileSync(
    "/etc/letsencrypt/live/my-backend.ru/chain.pem",
    "utf8"
);


const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/images", express.static(path.resolve(__dirname, "files", "images")));

const server = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

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
    httpsServer.listen(443, () => console.log(`server started on port 443`));
  }catch (error){
    console.log(error);
  }
}
start().then(r=>r);