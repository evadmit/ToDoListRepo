import * as React from 'react';
import LoginContainer from './containers/login/LoginContainer';
import RegisterContainer from './containers/register/RegisterContainer';
import NewToDoContainer from './containers/newtodo/NewToDoContainer';
import ToDoListContainer from './containers/todolist/ToDoListContainer';

import { Button, View, Dimensions  } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers/index';
import EditToDoComponent from './components/EditToDoComponent';
const sagaMiddleware = creatSagaMiddleware()
let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)


class EditToDoScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <EditToDoComponent/>
      </View>
    );
  }
}


const RootStack = createStackNavigator({
  Login: {screen: LoginContainer},
  Register: {screen: RegisterContainer},
  ToDoList: {screen : ToDoListContainer},
  EditToDo: EditToDoScreen,
  NewToDo:{screen: NewToDoContainer} 
});

const App = createAppContainer(RootStack);

// Now AppContainer is the main component for React to render
export default App;
