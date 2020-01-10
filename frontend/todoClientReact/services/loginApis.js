import { api } from './api';
import * as Routes from './config';

export const login = (params) => {
    console.log("login params", params);
    return api.post(Routes.LOGIN_AUTH_URL, params);
}


export const googleLogin = (params) => {
    console.log("googleLogin params", params);
    return api.post(Routes.GOOGLE_AUTH_URL, params);
}

export const facebookLogin = (params) => {
    console.log("facebookLogin params", params);
    return api.post(Routes.FACEBOOK_AUTH_URL, params);
}