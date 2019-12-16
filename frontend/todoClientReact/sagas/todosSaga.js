import { put, call, takeLatest, fork } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as todoApis from '../services/todoApis'
import * as todoActions from '../actions/todoActions'

export function* loadTodos(action){
try {
    const todos = yield call(todoApis.getTodos);
    console.log("function* loadTodos", todos);
    action.onSuccess(todos.data);
   // yield put(todoActions.setTodos(todos)); //save local

} catch (error) {
    yield put(todoActions.setError(error.toString()));
}
}

export function* addTodo(action){
    try {
        const todo = yield call(todoApis.addTodo, action.params);
     
        action.onSuccess(todo.data);
      //  yield put(todoActions.addTodo(todo)); //save local
    } catch (error) {
        yield put(todoActions.setError(error.toString()));
    }
}

export function* watchAddTodo() {
    yield fork(takeLatest,types.TODOS.ADD, addTodo)
}
 
export function* watchloadTodos() {
    yield fork(takeLatest,types.TODOS.LOAD, loadTodos)
}