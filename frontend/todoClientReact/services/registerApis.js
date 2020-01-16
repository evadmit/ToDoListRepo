import { api } from './api';
import * as Routes from './config';

export const register = (params) => {
    return api.post(Routes.REGISTER_AUTH_URL, params);
}