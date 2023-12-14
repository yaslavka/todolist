import { takeEvery, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as ActionTypes from '../constants/task.constants'
import * as actions from '../actions/task.actions'
import * as api from '../api/tak.api'

export function* taskInfo() {
    try {
        const response = yield call(api.taskInfo)
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
        yield put(actions.addTaskError(error.message))
        toast.error(error.message)
    }
}
export default function* taskSaga() {
    yield all([
        takeEvery(ActionTypes.TASK_INFO_REQUEST, taskInfo),
        takeEvery(ActionTypes.ADD_TASK_REQUEST, taskAdd),
        takeEvery(ActionTypes.ADD_TASK_AUTH_REQUEST, taskAuthAdd),
    ])
}
