export const environment = {
    production: false
  };
  
  
  //export const SERVER_URL = 'http://localhost:3003';
  
  export const SERVER_URL = 'https://5b7d2c63.ngrok.io';//testing
  export const USER_TOKEN = 'USER_TOKEN';
  const TODO_CONTROLLER_URL = '/todo/';
  const AUTH_CONTROLLER_URL = '/auth/';
  
  export const EDIT_TODO_URL = TODO_CONTROLLER_URL+'edit?todoID=';
  export const ADD_TODO_URL = TODO_CONTROLLER_URL+'add/';
  export const GET_TODOS_URL = TODO_CONTROLLER_URL+'todos/';
  export const DELETE_TODO_URL = TODO_CONTROLLER_URL+'delete?todoID=';
  export const CHANGE_TODO_STATUS_URL = TODO_CONTROLLER_URL+'change-status?todoID=';
  
  export const SYNC_TODOS_URL = TODO_CONTROLLER_URL+'sync-todos';
  
  export const REGISTER_AUTH_URL = AUTH_CONTROLLER_URL+'register/';
  export const LOGIN_AUTH_URL = AUTH_CONTROLLER_URL+'login/';
  export const FACEBOOK_AUTH_URL = AUTH_CONTROLLER_URL+'login-facebook/';
  export const OAUTH_AUTH_URL = AUTH_CONTROLLER_URL+'login-oauth/';
  export const GOOGLE_AUTH_URL = AUTH_CONTROLLER_URL+'google/';
  export const hereMapApiKey = "GLT2b_0SS2cfSgN6PTxIVq2HJrUpmK0qmrsjTrCgtDc";
  