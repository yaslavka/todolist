import {baseInstance} from "./index";

export const taskInfo = (data) => baseInstance.get(`/task?pages=${data?.pages}&count=${data?.count}&foolName=${data?.foolName}&email=${data?.email}&status=${data?.status}`)

export const taskAdd = (task) => baseInstance.post(`/task_add`, task)

export const taskAuthAdd = (task) => baseInstance.post(`/task_auth_add`, task)

export const taskStatus = (task) => baseInstance.post(`/task_status`, task)

export const taskEdit = (task) => baseInstance.post(`/task_edit`, task)

export const taskFilter = (data) => baseInstance.get(`/task_filter?pages=${data?.pages}&count=${data?.count}&foolName=${data.foolName}&email=${data.email}&status=${data.status}`)

