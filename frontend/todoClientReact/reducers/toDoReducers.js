import * as types from '../actions/types';
import appState from '../contants/initialState';
import { combineReducers } from 'redux';

const addToDoReducer = (state = appState.addTodo, action) => {
    console.log("addToDoReducer", action)
    switch (action.type) {
        case types.TODOS.ADD:
            return { ...state, ...{ newToDo: action.data } }
        default:
            return state
    }
}

const toDoListReducer = (state = appState.loadTodos, action) => {
    console.log("toDoListReducer" , action.data)
    switch (action.type) {
        case types.TODOS.LOAD:
            console.log(" case types.TODOS.LOAD")
            return { ...state, ...{ todoList: action.data } }
        default:
            return state
    }
}
const toDoReducers = combineReducers({
    addToDoReducer: addToDoReducer,
    toDoListReducer: toDoListReducer
})
export default toDoReducers