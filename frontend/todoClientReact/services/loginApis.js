import { api } from './api';
import * as Routes from './config';

export const login = (params) => {
    return api.post(Routes.LOGIN_AUTH_URL, params);
}

export const googleLogin = (params) => {
    return api.post(Routes.GOOGLE_AUTH_URL, params);
}

export const facebookLogin = (params) => {
    return api.post(Routes.OAUTH_AUTH_URL, params);
}