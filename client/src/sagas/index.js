import { all } from 'redux-saga/effects'
import appSaga from "./app.sagas";
import authSaga from "./auth.sagas";
import taskSaga from "./task.sagas";


export default function* rootSaga() {
    yield all([
        appSaga(),
        authSaga(),
        taskSaga(),
    ])
}