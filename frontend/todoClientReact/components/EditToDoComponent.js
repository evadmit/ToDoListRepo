import React, { Component } from 'react';
import {Text, StyleSheet, View, Button,TextInput  } from 'react-native';

import { withNavigation } from 'react-navigation';

class EditToDoComponent extends Component{

render(){
    return(
        <View>
<Text>Edit ToDo</Text>
<View style={{margin:10}} >
            <Button title="Save" onPress={() => this.props.navigation.goBack()}></Button></View>
          
        </View>
    )
}
}


export default withNavigation(EditToDoComponent);

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