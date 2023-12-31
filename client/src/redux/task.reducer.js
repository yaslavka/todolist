import * as ActionTypes from '../constants/task.constants'

const initialState = {
    pages: 1,
    status: undefined,
    email: '',
    foolName: '',
    task: null,
    taskAdd: null,
    taskAuthAdd: null,
    taskStatus: null,
    taskEdit: null,
    loadings: {
        task: false,
        taskAdd: false,
        taskAuthAdd: false,
        taskStatus: false,
        taskEdit: false,
        taskFilter:false,
    },
    errors: {
        task: null,
        taskAdd: null,
        taskAuthAdd: null,
        taskStatus: null,
        taskEdit: null,
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

        case ActionTypes.TASK_EDIT_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, taskEdit: true },
                errors: { ...state.errors, taskEdit: null },
            }
        }
        case ActionTypes.TASK_EDIT_SUCCESS: {
            const taskEdit = action.payload
            return {
                ...state,
                loadings: { ...state.loadings, taskEdit: false },
                errors: { ...state.errors, taskEdit: null },
                taskEdit,
            }
        }
        case ActionTypes.TASK_EDIT_ERROR: {
            return {
                ...state,
                loadings: { ...state.loadings, taskEdit: false },
                errors: { ...state.errors, taskEdit: action.payload },
            }
        }

        case ActionTypes.TASK_PAGES: {
            const pages = action.payload
            return {...state, pages: pages}
        }
        case ActionTypes.TASK_STATUS: {
            const status = action.payload
            return {...state, status: status}
        }
        case ActionTypes.TASK_USER_EMAIL: {
            const email = action.payload
            return {...state, email: email}
        }
        case ActionTypes.TASK_USER_NAME: {
            const foolName = action.payload
            return {...state, foolName: foolName}
        }
        default:
            return state
    }
}
export default taskReducer
