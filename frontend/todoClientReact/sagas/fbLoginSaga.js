import { put, call, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as loginApis from '../services/loginApis';
import { setUserInfo } from '../actions/loginActions';
import { setToken } from '../services/api';

export function* fbLogin(action) {
    try {
        const data = yield call(loginApis.facebookLogin, action.params)
        action.onSuccess(data.data)
        setToken(data.data.token || '');
        yield put(setUserInfo(data.data.user))
    } catch (error) {
        action.onError(error)
    }
}

export function* watchFbLogin() {
    yield takeLatest(types.FB_LOGIN, fbLogin)
}