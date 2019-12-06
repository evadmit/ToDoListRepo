import React, { Component } from 'react';
import { StyleSheet, View, Button,TextInput  } from 'react-native';

import { withNavigation } from 'react-navigation';

class LoginComponent extends Component{
   state = { email: '', password: '' }

    render() {
        return (
          <View style={{flex: 1, 
            flexDirection: 'column',
            justifyContent: 'center',}}>
            <TextInput style={styles.input} placeholder="Email"  onChangeText={(value) => this.setState({ email: value })}></TextInput>
        
            <TextInput style={styles.input} placeholder="Password"  secureTextEntry
                    //onChangeText={(value) => this.setState({ password: value })} 
                    ></TextInput>
            <View style={{margin:10}} >
            <Button title="Login" 
            onPress={() => this.props.navigation.navigate('ToDoList')}
            ></Button></View>
            <View style={{margin:10}}>
            <Button title="Register"   
            onPress={() => this.props.navigation.navigate('Register')}
            ></Button></View> 
          </View>
        );
      }

      // handleLogin = () =>{
      //   this.props.login({ email: this.state.email, password: this.state.password });
        
      // }
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