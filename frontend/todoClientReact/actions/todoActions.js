import { TODOS, STATS } from './types';

const loadTodos = () => ({
    type: TODOS.LOAD,
});

const addTodo = (newTodo)=>({
type: TODOS.ADD,
newTodo
})

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
    addTodo,
    setTodos,
    setError,
};