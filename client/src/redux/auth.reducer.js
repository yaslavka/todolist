import * as ActionTypes from '../constants/auth.constants'

const initialState = {
    isAuthenticated: false,
    signIn: null,
    signUp:null,
    signInAdmin: null,
    loadings: {
        signIn: false,
        signUp:false,
        signInAdmin: false,
    },
    errors: {
        signIn: null,
        signUp:null,
        signInAdmin: null,
    },
}

const authReducer = (state = initialState, action)=>{
    switch (action.type){
        case ActionTypes.SIGN_UP_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, signUp: true },
                errors: { ...state.errors, signUp: null },
            }
        }
        case ActionTypes.SIGN_UP_SUCCESS: {
            const signUp = action.payload
            return {
                ...state,
                isAuthenticated: true,
                loadings: { ...state.loadings, signUp: false },
                errors: { ...state.errors, signUp: null },
                signUp,
            }
        }
        case ActionTypes.SIGN_UP_ERROR: {
            return {
                ...state,
                isAuthenticated: false,
                loadings: { ...state.loadings, signUp: false },
                errors: { ...state.errors, signUp: action.payload },
            }
        }
        case ActionTypes.SIGN_IN_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, signIn: true },
                errors: { ...state.errors, signIn: null },
            }
        }
        case ActionTypes.SIGN_IN_SUCCESS: {
            const signIn = action.payload
            return {
                ...state,
                isAuthenticated: true,
                loadings: { ...state.loadings, signIn: false },
                errors: { ...state.errors, signIn: null },
                signIn,
            }
        }
        case ActionTypes.SIGN_IN_ERROR: {
            return {
                ...state,
                isAuthenticated: false,
                loadings: { ...state.loadings, signIn: false },
                errors: { ...state.errors, signIn: action.payload },
            }
        }
        case ActionTypes.SIGN_IN_ADMIN_REQUEST: {
            return {
                ...state,
                loadings: { ...state.loadings, signInAdmin: true },
                errors: { ...state.errors, signInAdmin: null },
            }
        }
        case ActionTypes.SIGN_IN_ADMIN_SUCCESS: {
            const signInAdmin = action.payload
            return {
                ...state,
                isAuthenticated: true,
                loadings: { ...state.loadings, signInAdmin: false },
                errors: { ...state.errors, signInAdmin: null },
                signInAdmin,
            }
        }
        case ActionTypes.SIGN_IN_ADMIN_ERROR: {
            return {
                ...state,
                isAuthenticated: false,
                loadings: { ...state.loadings, signInAdmin: false },
                errors: { ...state.errors, signInAdmin: action.payload },
            }
        }
        case ActionTypes.SIGN_OUT_REQUEST:
        case ActionTypes.SIGN_OUT_SUCCESS:
        case ActionTypes.SIGN_OUT_ERROR: {
            return initialState
        }

        default:
            return state
    }
}
export default authReducer
