import { LOGIN, SET_USER_INFO, FB_LOGIN } from './types';
export const login = (params, onSuccess, onError) => ({
    type: LOGIN,
    params,
    onSuccess,
    onError 
})
export const fbLogin = (params, onSuccess, onError) => ({
    type: FB_LOGIN,
    params,
    onSuccess,
    onError 
})
export const setUserInfo = (data) => ({
    type: SET_USER_INFO,
    data,
})