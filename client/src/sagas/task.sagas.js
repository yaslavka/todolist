import { takeEvery, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as ActionTypes from '../constants/task.constants'
import * as actions from '../actions/task.actions'
import * as api from '../api/tak.api'


export function* taskInfo(action) {
    try {
        const response = yield call(api.taskInfo, action.payload)
        if (response) {
            yield put(actions.taskInfoSuccess(response))
        }
    } catch (error) {
        yield put(actions.taskInfoError(error.message))
        toast.error(error.message)
    }
}

export function* taskAdd(action) {
    try {
        const response = yield call(api.taskAdd, action.payload)
        if (response) {
            yield put(actions.addTaskSuccess(response))
            toast.success(response.message)
            const task = yield call(api.taskInfo)
            yield put(actions.taskInfoSuccess(task))
        }
    } catch (error) {
        yield put(actions.addTaskError(error.message))
        toast.error(error.message)
    }
}
export function* taskAuthAdd(action) {
    try {
        const response = yield call(api.taskAuthAdd, action.payload)
        if (response) {
            yield put(actions.addTaskSuccess(response))
            toast.success(response.message)
            const task = yield call(api.taskInfo)
            yield put(actions.taskInfoSuccess(task))
        }
    } catch (error) {
        yield put(actions.addTaskAthError(error.message))
        toast.error(error.message)
    }
}

export function* taskStatus(action) {
    try {
        const response = yield call(api.taskStatus, action.payload)
        if (response) {
            yield put(actions.taskStatusSuccess(response))
            toast.success(response.message)
            const task = yield call(api.taskInfo)
            yield put(actions.taskInfoSuccess(task))
        }
    } catch (error) {
        yield put(actions.taskStatusError(error.message))
        toast.error(error.message)
    }
}

export function* taskEdit(action) {
    try {
        const response = yield call(api.taskEdit, action.payload)
        if (response) {
            yield put(actions.taskEditSuccess(response))
            toast.success(response.message)
            const task = yield call(api.taskInfo)
            yield put(actions.taskInfoSuccess(task))
        }
    } catch (error) {
        yield put(actions.taskEditError(error.message))
        toast.error(error.message)
    }
}

export default function* taskSaga() {
    yield all([
        takeEvery(ActionTypes.TASK_INFO_REQUEST, taskInfo),
        takeEvery(ActionTypes.ADD_TASK_REQUEST, taskAdd),
        takeEvery(ActionTypes.ADD_TASK_AUTH_REQUEST, taskAuthAdd),
        takeEvery(ActionTypes.TASK_STATUS_REQUEST, taskStatus),
        takeEvery(ActionTypes.TASK_EDIT_REQUEST, taskEdit),
    ])
}
