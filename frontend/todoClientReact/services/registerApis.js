import { api } from './api';

export const register = (params) => {
    console.log("register params", params);
    return api.post('/auth/register', params);
}