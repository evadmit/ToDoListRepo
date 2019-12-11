import { TODOS, STATS } from './types';

const loadTodos = () => ({
    type: TODOS.LOAD,
});

const setTodos = todos => ({
    type: TODOS.LOAD_SUCCESS,
    todos,
});

const setError = error => ({
    type: TODOS.LOAD_FAIL,
    error,
});



export {
    loadTodos,
    setTodos,
    setError,
};