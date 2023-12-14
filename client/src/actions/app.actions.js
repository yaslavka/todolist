import * as ActionTypes from '../constants/app.constants'

/* User Info */
export const userInfo = (values) => ({
    type: ActionTypes.USER_INFO_REQUEST,
    payload: values,
})
export const userInfoSuccess = (values) => ({
    type: ActionTypes.USER_INFO_SUCCESS,
    payload: values,

})
export const userInfoError = (error) => ({
    type: ActionTypes.USER_INFO_ERROR,
    payload: error,
})
