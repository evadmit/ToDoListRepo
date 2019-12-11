import { REGISTER } from './types';
export const register = (params, onSuccess, onError) => ({
    type: REGISTER,
    params,
    onSuccess,
    onError
})