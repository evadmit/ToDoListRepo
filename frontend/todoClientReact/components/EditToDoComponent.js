import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, Dimensions, Image } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';
import Input from './commons/Input';
import { withNavigation } from 'react-navigation';

var dotImage = require('../recources/map_marker.png');

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class EditToDoComponent extends Component {


  state = {
    title: '',
    description: '',
    isCompleted: 0,
    image: '',
    userEmail: '',
    coordinates: { latitude: '', longitude: '' },
    marker: {
      coordinate: {
        latitude: 45.5209087,
        longitude: -122.6705107,
      },
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: ''

    }
  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {

      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {


      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {

        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, (response) => {

      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });

  }

  renderFileData() {
    try {
      if (this.props.navigation.state.params.item.image) {
          return <Image source={{ uri:this.props.navigation.state.params.item.image}}
          style={styles.images}
        />
      } 
      if (this.state.fileData) {
          return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}
        />
      } 
    } catch (error) {
      console.log(error);
    }

  }

  render() {
   const { width, height } = Dimensions.get('window');
   const item = this.props.navigation.state.params.item;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text>{JSON.stringify(item.title)}</Text>
    <Input placeholder={item.description} onChangeText={(value) => this.setState({ description: value })}>{item.description}</Input>
            <Button title="Add Image" onPress={() => this.chooseImage()}  ></Button>
          </View>
          <View>
            {this.renderFileData()}
          </View>
        </View>

        <MapView showsUserLocation={true}
          followUserLocation={true}
          style={{ margin: 15, height: height / 2, width: width / 5 * 4 }}
          initialRegion={{
            latitude: item.coordinates.latitude,
            longitude: item.coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

      <Marker coordinate={item.coordinates} draggable={false}>
            <View style={styles.marker}>
              <Image source={dotImage} style={{ height: 35, width: 35 }} />
            </View>
          </Marker>

        </MapView>

        <View style={{ margin: 10 }} >
          <Button title="Save" 
          onPress={() => {
            let img = ('data:image/jpeg;base64,' + this.state.fileData);
            this.props.editTodo({
            _id: item._id,
            title:  item.title,
            description: this.state.description,
            isCompleted:  item.isCompleted,
            image: img,
            userEmail:  '',
            coordinates:  item.coordinates
          })}}></Button></View>
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
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },

});