import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import appReducer from "./app.reducer";
import authReducer from "./auth.reducer";
import taskReducer from "./task.reducer";
import useStateReducer from "./globalUseState.reducer";


const rootReducer = (history) =>
    combineReducers({
        auth:authReducer,
        app: appReducer,
        task:taskReducer,
        useState:useStateReducer,
        router: connectRouter(history),
    })

export default rootReducer