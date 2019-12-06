import * as React from 'react';

import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import LoginComponent from './components/LoginComponent';
import NewToDoComponent from './components/NewToDoComponent';
import EditToDoComponent from './components/EditToDoComponent';
import ToDoListComponent from './components/ToDoListComponent';
import RegisterComponent from './components/RegisterComponent';


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
  Login: LoginScreen,
  Register: RegisterScreen,
  ToDoList: ToDoListScreen,
  EditToDo: EditToDoScreen,
  NewToDo: NewToDoScreen
});

export default createAppContainer(RootStack);