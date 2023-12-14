import * as ActionTypes from '../constants/auth.constants'
/* Sign In */
export const signIn = (values) => ({
    type: ActionTypes.SIGN_IN_REQUEST,
    payload: values,
})
export const signInSuccess = (values) => ({
    type: ActionTypes.SIGN_IN_SUCCESS,
    payload: values,
})
export const signInError = (error) => ({
    type: ActionTypes.SIGN_IN_ERROR,
    payload: error,
})

export const signInAdmin = (values) => ({
    type: ActionTypes.SIGN_IN_ADMIN_REQUEST,
    payload: values,
})
export const signInAdminSuccess = (values) => ({
    type: ActionTypes.SIGN_IN_ADMIN_SUCCESS,
    payload: values,
})
export const signInAdminError = (error) => ({
    type: ActionTypes.SIGN_IN_ADMIN_ERROR,
    payload: error,
})

/* Sign UP */
export const signUp = (values) => ({
    type: ActionTypes.SIGN_UP_REQUEST,
    payload: values,
})
export const signUpSuccess = (values) => ({
    type: ActionTypes.SIGN_UP_SUCCESS,
    payload: values,
})
export const signUpError = (error) => ({
    type: ActionTypes.SIGN_UP_ERROR,
    payload: error,
})

/* Sign Out */
export const signOut = () => ({ type: ActionTypes.SIGN_OUT_REQUEST })
export const signOutSuccess = () => ({ type: ActionTypes.SIGN_OUT_SUCCESS })
export const signOutError = (error) => ({
    type: ActionTypes.SIGN_OUT_ERROR,
    payload: error,
})