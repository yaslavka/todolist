import { takeEvery, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as ActionTypes from '../constants/app.constants'
import * as actions from '../actions/app.actions'
import * as api from '../api/app.api'

export function* userInfo() {
    try {
        const response = yield call(api.userInfo)
        if (response) {
            yield put(actions.userInfoSuccess(response))
        }
    } catch (error) {
        yield put(actions.userInfoError(error))
        toast.error(error.message)
    }
}
export default function* appSaga() {
    yield all([
        takeEvery(ActionTypes.USER_INFO_REQUEST, userInfo),
    ])
}
