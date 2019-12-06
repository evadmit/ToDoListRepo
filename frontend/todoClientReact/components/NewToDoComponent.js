import React, { Component } from 'react';
import {Text, StyleSheet, View, Button,TextInput  } from 'react-native';

import { withNavigation } from 'react-navigation';



class NewToDoComponent extends Component{

render(){
    return(
        <View style={{flex: 1, 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'}}>

<TextInput style={styles.input} placeholder="Title"></TextInput>

<TextInput style={styles.input} placeholder="Description"></TextInput>

<TextInput style={styles.input} placeholder="MAP"></TextInput>

    <Button title="Add"></Button>       
         </View>
    )
}
}

export default withNavigation(NewToDoComponent);

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