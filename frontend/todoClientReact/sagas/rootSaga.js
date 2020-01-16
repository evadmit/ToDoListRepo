import { all } from 'redux-saga/effects';
import { watchLogin } from '../sagas/login';
import { watchFbLogin } from '../sagas/fbLoginSaga';
import { watchRegister } from '../sagas/registerSaga';
import {watchAddTodo, watchloadTodos} from '../sagas/todosSaga';
function* rootSaga() {
    yield all([
        watchLogin(),
        watchFbLogin(),
        watchRegister(),
        watchAddTodo() ,
        watchloadTodos()
    ])
}
export default rootSaga