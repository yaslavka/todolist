import {baseInstance} from "./index";

export const taskInfo = () => baseInstance.get('/task')

export const taskAdd = (task) => baseInstance.post(`/task_add`, task)

export const taskAuthAdd = (task) => baseInstance.post(`/task_auth_add`, task)

export const taskStatus = (task) => baseInstance.post(`/task_status`, task)

export const taskEdit = (task) => baseInstance.post(`/task_edit`, task)

