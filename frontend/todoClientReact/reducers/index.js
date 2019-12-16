import { combineReducers } from 'redux';
import loginReducers from './loginReducers';
import toDoReducers from './toDoReducers';

const allReducers = combineReducers({
    login: loginReducers,
    todo: toDoReducers
})
export default allReducers