import { put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as registerApis from '../services/registerApis';
import { setUserInfo } from '../actions/registerActions';
import { setToken } from '../services/api';

export function* register(action) {
    try {
        const data = yield call(registerApis.register, action.params)
        action.onSuccess(data.data)
        setToken(data.data.token || '');
        yield put(setUserInfo(data.data.user))
    } catch (error) {
        action.onError(error)
    }
}

export function* watchRegister() {
    yield takeLatest(types.REGISTER, register)
}