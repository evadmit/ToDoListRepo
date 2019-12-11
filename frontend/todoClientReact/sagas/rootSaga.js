import { all } from 'redux-saga/effects';
import { watchLogin } from '../sagas/login';
import { watchRegister } from '../sagas/registerSaga';
function* rootSaga() {
    yield all([
        watchLogin(),
        watchRegister()
    ])
}
export default rootSaga