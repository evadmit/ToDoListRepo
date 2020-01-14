import React, { Component } from 'react';
import { StyleSheet, View, Button  } from 'react-native';
import { getToken } from './../utils/storage';
import { withNavigation } from 'react-navigation';
import Input from './commons/Input'
//import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
class LoginComponent extends Component{
   state = { email: '', password: '', userInfo: {} }


   getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({userInfo: result});
          console.log('result:', result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start(); };

   constructor(props) {
    super(props);
 const token = getToken();
 if(token!== null){
 // props.navigation.navigate('ToDoList')
 }
}

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
            
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const accessToken = data.accessToken.toString();
                this.getInfoFromToken(accessToken);
              });
            }
          }}
          onLogoutFinished={() => this.setState({userInfo: {}})}
        />
        {this.state.userInfo.name && (
          <Text style={{fontSize: 16, marginVertical: 16}}>
            Logged in As {this.state.userInfo.name}
          </Text>
        )}
      <View style={{margin:10}} >
            {/* <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}/> */}
            <Button title="Login" 
              onPress={() => this.props.login({ 
                email: this.state.email, 
                password: this.state.password })}
            ></Button>
          
            </View>
            <View style={{margin:10}}>
            <Button title="Register"   
            onPress={() => this.props.navigation.navigate('Register')}
            ></Button></View> 
          </View></View>
        );
      }

      componentDidMount(){
        console.log("componentDidMount")
        // GoogleSignin.configure({
        //   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        //   webClientId: '404588248203-luf7jkllctht7d0mj2i5jps9k3t7cadr.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        //   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        //  // hostedDomain: '', // specifies a hosted domain restriction
        //  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        //   forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        //   accountName: '', // [Android] specifies an account name on the device that should be used
        //   //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        // });
      }
      // signIn = async () => {
      //   try {
      //     await GoogleSignin.hasPlayServices();
      //     const userInfo = await GoogleSignin.signIn();
      //    // this.setState({ userInfo });
      //   } catch (error) {
      //     console.log("signIn",error);
      //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //       // user cancelled the login flow
      //     } else if (error.code === statusCodes.IN_PROGRESS) {
      //       // operation (e.g. sign in) is in progress already
      //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //       // play services not available or outdated
      //     } else {
      //       // some other error happened
      //     }
      //   }
      // };
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