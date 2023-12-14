import * as ActionTypes from '../constants/globalUseState.constants'

export const modalAuth = (values) => ({
    type: ActionTypes.MODAL_AUTH_VISIBLE,
    payload: values,
})

export const modalSinUp = (values) => ({
    type: ActionTypes.MODAL_SIGN_UP_VISIBLE,
    payload: values,
})

export const modalSortName = (values) => ({
    type: ActionTypes.MODAL_SORT_NAME_VISIBLE,
    payload: values,
})
export const modalSortEmail = (values) => ({
    type: ActionTypes.MODAL_SORT_EMAIL_VISIBLE,
    payload: values,
})
export const modalSortStatus = (values) => ({
    type: ActionTypes.MODAL_SORT_STATUS_VISIBLE,
    payload: values,
})
export const modalSortAdd = (values) => ({
    type: ActionTypes.MODAL_SORT_ADD_VISIBLE,
    payload: values,
})