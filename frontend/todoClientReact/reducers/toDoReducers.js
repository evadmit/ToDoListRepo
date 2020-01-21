import * as types from '../actions/types';
import appState from '../contants/initialState';
import { combineReducers } from 'redux';

const addToDoReducer = (state = appState.addTodo, action) => {

    switch (action.type) {
        case types.TODOS.ADD:
            return { ...state, ...{ newToDo: action.data } }
        default:
            return state
    }
}

const toDoActionsReducer = (state = appState.updateTodo, action) => {

    switch (action.type) {
        case types.TODOS.CHANGE_STATUS:
            return { ...state, ...{ item: action.data } }

        case types.TODOS.EDIT:
            return { ...state, ...{ item: action.data } }

        case types.TODOS.DELETE:
            return { ...state, ...{ item: action.data } }

        default:
            return state
    }
}

const toDoListReducer = (state = appState.loadTodos, action) => {

    switch (action.type) {
        case types.TODOS.LOAD:
            return { ...state, loading: true };

        case types.TODOS.LOAD_SUCCESS:

            return { ...state, todos: action.todos, loading: false }
        default:
            return state
    }
}
const toDoReducers = combineReducers({
    addToDoReducer: addToDoReducer,
    toDoListReducer: toDoListReducer,
    toDoActionsReducer: toDoActionsReducer
})
export default toDoReducers