import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as todoApis from '../services/todoApis'
import * as todoActions from '../actions/todoActions'

export function* loadTodos(action){
try {
    const todos = yield call(todoApis.getTodos);
    console.log("function* loadTodos",JSON.stringify( todos.data.todoList));
    action.onSuccess(todos.data.todoList);
    return todos.data.todoList
   // yield put(todoActions.setTodos(todos)); //save local

} catch (error) {
    console.log("function* loadTodos", error);
    yield put(todoActions.setError(error.toString()));
}
}

export function* addTodo(action){
    try {
        const todo = yield call(todoApis.addTodo, action.params);
     
        action.onSuccess(todo.data);
      //  yield put(todoActions.addTodo(todo)); //save local
    } catch (error) {
        console.log("function* addTodo", error);
        yield put(todoActions.setError(error.toString()));
    }
}

export function* todoSagas(){
    yield all([
        takeEvery(types.TODOS.ADD, addTodo),
        takeEvery(types.TODOS.LOAD, loadTodos),
      ]);
}
