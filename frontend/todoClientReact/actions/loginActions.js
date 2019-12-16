import { LOGIN, SET_USER_INFO } from './types';
export const login = (params, onSuccess, onError) => ({
    type: LOGIN,
    params,
    onSuccess,
    onError 
})
export const setUserInfo = (data) => ({
    type: SET_USER_INFO,
    data,
})