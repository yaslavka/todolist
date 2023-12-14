import * as ActionTypes from '../constants/task.constants'

/* task Info */
export const taskInfo = (values) => ({
    type: ActionTypes.TASK_INFO_REQUEST,
    payload: values,
})
export const taskInfoSuccess = (values) => ({
    type: ActionTypes.TASK_INFO_SUCCESS,
    payload: values,

})
export const taskInfoError = (error) => ({
    type: ActionTypes.TASK_INFO_ERROR,
    payload: error,
})

export const addTaskAth = (values) => ({
    type: ActionTypes.ADD_TASK_AUTH_REQUEST,
    payload: values,
})
export const addTaskAthSuccess = (values) => ({
    type: ActionTypes.ADD_TASK_AUTH_SUCCESS,
    payload: values,

})
export const addTaskAthError = (error) => ({
    type: ActionTypes.ADD_TASK_AUTH_ERROR,
    payload: error,
})

export const addTask = (values) => ({
    type: ActionTypes.ADD_TASK_REQUEST,
    payload: values,
})
export const addTaskSuccess = (values) => ({
    type: ActionTypes.ADD_TASK_SUCCESS,
    payload: values,

})
export const addTaskError = (error) => ({
    type: ActionTypes.ADD_TASK_ERROR,
    payload: error,
})