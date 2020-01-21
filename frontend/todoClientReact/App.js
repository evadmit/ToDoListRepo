import * as React from 'react';
import LoginContainer from './containers/login/LoginContainer';
import RegisterContainer from './containers/register/RegisterContainer';
import NewToDoContainer from './containers/newtodo/NewToDoContainer';
import ToDoListContainer from './containers/todolist/ToDoListContainer';
import EditTodoContainer from './containers/edittodo/EditTodoContainer';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers/index';
const sagaMiddleware = creatSagaMiddleware()
let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)



const RootStack = createStackNavigator({
  Login: {screen: LoginContainer},
  Register: {screen: RegisterContainer},
  ToDoList: {screen : ToDoListContainer},
  EditToDo: {screen: EditTodoContainer} ,
  NewToDo:{screen: NewToDoContainer} 
});

const App = createAppContainer(RootStack);

export default App;
