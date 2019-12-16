import React, { Component } from 'react';
import { StyleSheet, View, Button  } from 'react-native';

import { withNavigation } from 'react-navigation';
import Input from './commons/Input'

class LoginComponent extends Component{
   state = { email: '', password: '' }


    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View  style={{flex: 1, 
            flexDirection: 'column',
            justifyContent: 'center',}}>
            <Input placeholder="Email"  onChangeText={(value) => this.setState({ email: value })}></Input>
        
            <Input placeholder="Password"  secureTextEntry
                   onChangeText={(value) => this.setState({ password: value })} 
                    ></Input>
            <View style={{margin:10}} >
         
            <Button title="Login" 
              onPress={() => this.props.login({ 
                email: this.state.email, 
                password: this.state.password })}
            ></Button></View>
            <View style={{margin:10}}>
            <Button title="Register"   
            onPress={() => this.props.navigation.navigate('Register')}
            ></Button></View> 
          </View></View>
        );
      }

}
export default withNavigation(LoginComponent);

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