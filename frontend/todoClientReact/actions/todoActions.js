import { TODOS } from './types';

export const loadTodos = (onSuccess, onError) => ({
    type: TODOS.LOAD,
    onSuccess,
    onError
});

export const addTodo = (params, onSuccess, onError)=>({
type: TODOS.ADD,
params,
onSuccess,
onError
})

export const deleteTodo = (params, onSuccess, onError)=>({
    type: TODOS.DELETE,
    params,
    onSuccess,
    onError
    })
export const setTodos = todos => ({
    type: TODOS.LOAD_SUCCESS,
    todos,
});

export const setError = error => ({
    type: TODOS.LOAD_FAIL,
    error,
});
