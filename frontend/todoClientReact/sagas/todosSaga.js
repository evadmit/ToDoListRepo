import { put, call, takeEvery, select } from 'redux-saga/effects';
import{TODOS} from '../actions/types'
import {getTodos} from '../services/todoApis'
import {setTodos, setError} from '../actions/todoActions'
export function* handleGetTodos(){
try {
    const todos = yield call(getTodos);
    yield put(setTodos(todos));
    yield put()
} catch (error) {
    yield put(setError(error.toString()));
}

}