import * as ActionTypes from '../constants/task.constants'

const initialState = {
    task: null,
    taskAdd: null,
    taskAuthAdd: null,
    taskStatus: null,
    loadings: {
        task: false,
        taskAdd: false,
        taskAuthAdd: false,
        taskStatus: false,
    },
    errors: {
        task: null,
        taskAdd: null,
        taskAuthAdd: null,
        taskStatus: null,
    },
}
const taskReducer = (state = initialState, action) =>{
    switch (action.type){
        case ActionTypes.TASK_INFO_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, task: true },
                errors: { ...state.errors, task: null },
            }
        }
        case ActionTypes.TASK_INFO_SUCCESS: {
            const task = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, task: false },
                errors: { ...state.errors, task: null },
                task,
            }
        }
        case ActionTypes.TASK_INFO_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, task: false },
                errors: { ...state.errors, task: action.payload },
            }
        }

        case ActionTypes.ADD_TASK_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, taskAdd: true },
                errors: { ...state.errors, taskAdd: null },
            }
        }
        case ActionTypes.ADD_TASK_SUCCESS: {
            const taskAdd = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, taskAdd: false },
                errors: { ...state.errors, taskAdd: null },
                taskAdd,
            }
        }
        case ActionTypes.ADD_TASK_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, taskAdd: false },
                errors: { ...state.errors, taskAdd: action.payload },
            }
        }


        case ActionTypes.ADD_TASK_AUTH_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, taskAuthAdd: true },
                errors: { ...state.errors, taskAuthAdd: null },
            }
        }
        case ActionTypes.ADD_TASK_AUTH_SUCCESS: {
            const taskAuthAdd = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, taskAuthAdd: false },
                errors: { ...state.errors, taskAuthAdd: null },
                taskAuthAdd,
            }
        }
        case ActionTypes.ADD_TASK_AUTH_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, taskAuthAdd: false },
                errors: { ...state.errors, taskAuthAdd: action.payload },
            }
        }

        case ActionTypes.TASK_STATUS_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, taskStatus: true },
                errors: { ...state.errors, taskStatus: null },
            }
        }
        case ActionTypes.TASK_STATUS_SUCCESS: {
            const taskStatus = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, taskStatus: false },
                errors: { ...state.errors, taskStatus: null },
                taskStatus,
            }
        }
        case ActionTypes.TASK_STATUS_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, taskStatus: false },
                errors: { ...state.errors, taskStatus: action.payload },
            }
        }
        default:
            return state
    }
}
export default taskReducer