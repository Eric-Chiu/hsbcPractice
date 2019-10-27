import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import newsReducer from './reducers';
import rootSaga from './sagas';

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    newsReducer,
    applyMiddleware(
      sagaMiddleware,
      loggerMiddleware
    )
)

sagaMiddleware.run(rootSaga)

export default store
