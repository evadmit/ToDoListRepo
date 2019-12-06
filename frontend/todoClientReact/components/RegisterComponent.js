import React, { Component } from 'react';
import { StyleSheet, View, Button,TextInput  } from 'react-native';
import { withNavigation } from 'react-navigation';

class RegisterComponent extends Component{

    render(){
        return(
            <View style={{flex: 1, 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'}}>

        <TextInput style={styles.input} placeholder="Name"></TextInput>

        <TextInput style={styles.input} placeholder="Email"></TextInput>
        
        <TextInput style={styles.input} placeholder="Password"></TextInput>

        <TextInput style={styles.input} placeholder="Confirm password"></TextInput>
 
        <View  style={{height: 100, 
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'space-between'}}>
            <Button title="Register"></Button>
        
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