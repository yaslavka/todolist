import * as ActionTypes from '../constants/globalUseState.constants'

const initialState = {
  modalAuthVisible: false,
    modalSignUpVisible: false,
    modalSortNameVisible: false,
    modalSortEmailVisible: false,
    modalSortStatusVisible: false,
    modalSortAddVisible: false,
}
const useStateReducer = (state = initialState, action) =>{
    switch (action.type){
        case ActionTypes.MODAL_AUTH_VISIBLE: {
            const modalAuthVisible = action.payload
            return {...state, modalAuthVisible: modalAuthVisible}
        }
        case ActionTypes.MODAL_SIGN_UP_VISIBLE: {
            const modalSignUpVisible = action.payload
            return {...state, modalSignUpVisible: modalSignUpVisible}
        }

        case ActionTypes.MODAL_SORT_NAME_VISIBLE: {
            const modalSortNameVisible = action.payload
            return {...state, modalSortNameVisible: modalSortNameVisible}
        }

        case ActionTypes.MODAL_SORT_EMAIL_VISIBLE: {
            const modalSortEmailVisible = action.payload
            return {...state, modalSortEmailVisible: modalSortEmailVisible}
        }

        case ActionTypes.MODAL_SORT_STATUS_VISIBLE: {
            const modalSortStatusVisible = action.payload
            return {...state, modalSortStatusVisible: modalSortStatusVisible}
        }

        case ActionTypes.MODAL_SORT_ADD_VISIBLE: {
            const modalSortAddVisible = action.payload
            return {...state, modalSortAddVisible: modalSortAddVisible}
        }
        default:
            return state
    }
}
export default useStateReducer
