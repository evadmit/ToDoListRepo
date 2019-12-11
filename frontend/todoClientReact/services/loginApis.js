import { api } from './api';

export const login = (params) => {
    console.log("login params", params);
    return api.post('/auth/login', params);
}

