import React, { Component } from 'react';
import {  View, Button, Text } from 'react-native';
import { getToken } from './../utils/storage';
import { withNavigation } from 'react-navigation';
import Input from './commons/Input';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

class LoginComponent extends Component {
  state = { email: '', password: '', userInfo: {} }


  constructor(props) {
    super(props);

  }
  async componentDidMount() {
    try {
      const token = await getToken();
      console.log("token in component", token)
      if (token !== null) {
        this.props.navigation.navigate('ToDoList')
      }
    } catch (err) {

    }

  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <Input placeholder="Email" onChangeText={(value) => this.setState({ email: value })}></Input>

          <Input placeholder="Password" secureTextEntry
            onChangeText={(value) => this.setState({ password: value })}
          ></Input>


          <View style={{ margin: 10 }} >
            <LoginButton
              permissions={['public_profile', 'email']}
              onLoginFinished={
                (error, result) => {

                  if (error) {
                    console.log('login has error: ' + error);

                  } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                      const infoRequest = new GraphRequest(
                        '/me?fields=email,id,name',
                        null,
                        this._responseInfoCallback
                      );

                      new GraphRequestManager().addRequest(infoRequest).start();

                    });
                  }
                }}
              onLogoutFinished={() => this.setState({ userInfo: {} })}
            />
            {this.state.userInfo.name && (
              <Text style={{ fontSize: 16, marginVertical: 16 }}>
                Logged in As {this.state.userInfo.name}
              </Text>
            )}
            <Button title="Login"
              onPress={() => this.props.login({
                email: this.state.email,
                password: this.state.password
              })}
            ></Button>

          </View>
          <View style={{ margin: 10 }}>
            <Button title="Register"
              onPress={() => this.props.navigation.navigate('Register')}
            ></Button></View>
        </View></View>
    );
  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      const info = { name: result.name.toString(), password: result.id.toString(), email: result.email.toString() };
      this.setState({ userInfo: info });
      this.props.fbLogin(this.state.userInfo);
    }
  }
}

export default withNavigation(LoginComponent);
