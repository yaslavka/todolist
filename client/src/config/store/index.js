import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import rootSaga from '../../sagas'
import rootReducer from '../../redux'


const persistedState = {
    key: 'root',
    storage
}

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistedState, rootReducer(history));
const middleware = [sagaMiddleware, routerMiddleware(history)]
if (process.env.NODE_ENV === 'development') {
    middleware.push(
        createLogger({
            predicate: (getState, action) => ![].includes(action.type),
            collapsed: true,
        }),
    )
}

const enhancers = [applyMiddleware(...middleware)]

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Prevent recomputing reducers for `replaceReducer`
            shouldHotReload: false,
        })
        : compose

export default function configureStore() {
    const store = createStore(persistedReducer, composeEnhancers(...enhancers))
    const persistor = persistStore(store);
    sagaMiddleware.run(rootSaga)
    return {store, persistor}
}
