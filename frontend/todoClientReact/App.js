import * as React from 'react';

import LoginContainer from './containers/login/LoginContainer';
import RegisterContainer from './containers/register/RegisterContainer';

import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers/index';
import LoginComponent from './components/LoginComponent';
import NewToDoComponent from './components/NewToDoComponent';
import EditToDoComponent from './components/EditToDoComponent';
import ToDoListComponent from './components/ToDoListComponent';
import RegisterComponent from './components/RegisterComponent';

const sagaMiddleware = creatSagaMiddleware()
let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LoginComponent/>
        
      </View>
    );
  }
}

class RegisterScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <RegisterComponent/>
        
      </View>
    );
  }
}

class ToDoListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems:'stretch'}}>
        <ToDoListComponent/>
      </View>
    );
  }
}

class EditToDoScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <EditToDoComponent/>
      </View>
    );
  }
}

class NewToDoScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <NewToDoComponent/>
      </View>
    );
  }
}
const RootStack = createStackNavigator({
  Login: {screen: LoginContainer},
  Register: {screen: RegisterContainer},
  ToDoList: ToDoListScreen,
  EditToDo: EditToDoScreen,
  NewToDo: NewToDoScreen
});

const App = createAppContainer(RootStack);

// Now AppContainer is the main component for React to render
export default App;
