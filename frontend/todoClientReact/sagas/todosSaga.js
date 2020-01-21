import { put, call, takeEvery, all } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as todoApis from '../services/todoApis'
import * as todoActions from '../actions/todoActions'

export function* loadTodos(action) {
    try {
        const todos = yield call(todoApis.getTodos);
        yield put({ type: types.TODOS.LOAD_SUCCESS, json: todos.data.todoList });
        action.onSuccess(todos.data.todoList);
        yield put(todoActions.setTodos(todos.data.todoList));

    } catch (error) {
        console.log("function* loadTodos", error);
        yield put(todoActions.setError(error.toString()));
    }
}

export function* addTodo(action) {
    try {
        const todo = yield call(todoApis.addTodo, action.params);

        action.onSuccess(todo.data);
    } catch (error) {
        console.log("function* addTodo", error);
        yield put(todoActions.setError(error.toString()));
    }
}

export function* deleteTodo(action) {
    try {
        const todo = yield call(todoApis.deleteTodo, action.params);

        action.onSuccess(todo.data);
    } catch (error) {
        console.log("function* deleteTodo", error);
        yield put(todoActions.setError(error.toString()));
    }
}

export function* changeTodoStatus(action) {
    try {
        const todo = yield call(todoApis.changeTodoStatus, action.params);

        action.onSuccess(todo.data);
    } catch (error) {
        console.log("function* changeTodoStatus", error);
        yield put(todoActions.setError(error.toString()));
    }
}

export function* editTodo(action) {
    try {
        const todo = yield call(todoApis.editTodo, action.params);

        action.onSuccess(todo.data);
    } catch (error) {
        console.log("function* editTodo", error);
        yield put(todoActions.setError(error.toString()));
    }
}

export function* todoSagas() {
    yield all([
        takeEvery(types.TODOS.ADD, addTodo),
        takeEvery(types.TODOS.LOAD, loadTodos),
        takeEvery(types.TODOS.DELETE, deleteTodo),
        takeEvery(types.TODOS.CHANGE_STATUS, changeTodoStatus),
        takeEvery(types.TODOS.EDIT, editTodo),
    ]);
}
