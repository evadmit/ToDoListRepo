import * as types from '../actions/types';
import appState from '../contants/initialState';
import { combineReducers } from 'redux';

const loginReducer = (state = appState.login, action) => {
    switch (action.type) {
        case types.SET_USER_INFO:
            return { ...state, ...{ userInfo: action.data } }
        default:
            return state
    }
}

const fbLoginReducer = (state = appState.fbLogin, action) => {

    switch (action.type) {
        case types.SET_USER_INFO:
            return { ...state, ...{ userInfo: action.data } }
        default:
            return state
    }
}

const loginReducers = combineReducers({
    loginReducer: loginReducer,
    fbLoginReducer: fbLoginReducer
})

export default loginReducers