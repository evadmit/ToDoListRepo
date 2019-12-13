import React, { Component } from 'react';
import { Image,StyleSheet, View, Button,Dimensions  } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { withNavigation } from 'react-navigation';

import Input from './commons/Input';
var dotImage = require('../recources/map_marker.png')

class NewToDoComponent extends Component{

  state = { title:'', description: '', isCompleated: 0, image:'', userEmail:'', coordinates:{latitude:'', longitude:''} }
 constructor(props){
   super(props);
   this.state = {
    marker:  {
      coordinate:{
        latitude: 45.5209087,
        longitude: -122.6705107,
    }
    }
  }
  this.handlePress = this.handlePress.bind(this);
 }

 handlePress(e) {
  this.setState({
    marker: 
      {
        coordinate: e.nativeEvent.coordinate
      }
    
  })
}
render(){ 
  const { width, height } = Dimensions.get('window');
    return(
        <View style={{flex: 1, 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'}}>

<Input  placeholder="Title" onChangeText={(value) => this.setState({ title: value })}></Input>

<Input  placeholder="Description" onChangeText={(value) => this.setState({ description: value })}></Input>

    <Button title="Add"
      onPress={() => this.props.newToDo({ 
        title: this.state.title,
        description: this.state.description, 
        isCompleated: this.state.isCompleated, 
        image: this.state.image, 
        userEmail: this.state.userEmail, 
        coordinates: this.state.coordinates })}
    ></Button>    
    <MapView showsUserLocation={true}
          followUserLocation={true} 
          style={{margin:15, height: height/2, width:width/5*4}}
          initialRegion={{
            latitude: 45.5209087,
            longitude: -122.6705107,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} 
          onPress={this.handlePress}
      >
       {/* {this.state.marker.map((marker) => {
        return ( */}
          <Marker  coordinate={this.state.marker.coordinate} draggable = {true}>
            <View style={styles.marker}>
            <Image source={dotImage} style={{height: 35, width:35 }} />
            </View>
          </Marker>
         {/* )
        })} */}
      </MapView>
   
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