// import axios from 'axios';
// import { getToken } from '../utils/storage';
// import { SERVER_URL } from './config';

// export const api = axios.create({
//   baseURL: SERVER_URL,
//   timeout: 6000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export function setToken(token) {
//   api.defaults.headers.common.Authorization = `Bearer ${token}`;
// }

// getToken().then((token) => {
//   setToken(token);
// });