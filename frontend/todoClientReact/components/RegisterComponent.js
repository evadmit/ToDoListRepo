import React, { Component } from 'react';
import { StyleSheet, View, Button,TextInput  } from 'react-native';
import { withNavigation } from 'react-navigation';

import Input from './commons/Input';

class RegisterComponent extends Component{
  state = { name:'', email: '', password: '', confirmPassword:'' }

    render(){
        return(
            <View style={{flex: 1, 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'}}>

        <Input placeholder="Name" onChangeText={(value) => this.setState({ name: value })}></Input>

        <Input placeholder="Email" onChangeText={(value) => this.setState({ email: value })}></Input>
        
        <Input placeholder="Password" onChangeText={(value) => this.setState({ password: value })}></Input>

        <Input placeholder="Confirm password" onChangeText={(value) => this.setState({ confirmPassword: value })}></Input>
 
        <View  style={{height: 100, 
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'space-between'}}>
            <Button title="Register"   
            onPress={() => this.props.register({ 
               name: this.state.name,
               email: this.state.email, 
               password: this.state.password, 
               confirmPassword: this.state.confirmPassword })}
            ></Button>
        
            <Button title="I'm already have an account"   onPress={() => this.props.navigation.goBack()}></Button>
      
      </View>   
        </View>
        )
    }

}
export default withNavigation(RegisterComponent);

const styles = StyleSheet.create({
    input: {
      margin: 10,
      width: 200,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#60b1fc',
    },
    title: {
      fontSize: 19,
      fontWeight: 'bold',
    },

  });