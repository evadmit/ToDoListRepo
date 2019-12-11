
import { createStore, applyMiddleware } from 'redux';
import allReducers from '../reducers/index';

import rootSaga from '../sagas/rootSaga';

import creatSagaMiddleware from 'redux-saga';

const sagaMiddleware = creatSagaMiddleware();
const configureStore = () => {
    let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(rootSaga);
    return store;
}
export default configureStore;