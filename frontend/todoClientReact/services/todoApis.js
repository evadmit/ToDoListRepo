import * as Routes from './config';
import { api } from './api';

export const getTodos = () => {
    try {
        var response = api.get(Routes.GET_TODOS_URL);

        return response;
    } catch (error) {
        console.log("getTodos error ", error);
    }

};

export const addTodo = (params) => {

    try {
        var apiResult = api.post(Routes.ADD_TODO_URL, params);
    }
    catch (er) {
        console.log("eror adding", er)
    }

    return apiResult;
}

export const deleteTodo = (params) => {

    try {
        var apiResult = api.delete(Routes.DELETE_TODO_URL + params);
    }
    catch (er) {
        console.log("eror deleting", er)
    }

    return apiResult;
}

export const editTodo  = (params) => {

    try {
        var apiResult = api.post(Routes.EDIT_TODO_URL + params._id, params );
    }
    catch (er) {
        console.log("eror editTodo", er)
    }

    return apiResult;
}

export const changeTodoStatus = (params) => {

    try {
        var apiResult = api.post(Routes.CHANGE_TODO_STATUS_URL + params);
    }
    catch (er) {
        console.log("eror changeTodoStatus", er)
    }

    return apiResult;
}
