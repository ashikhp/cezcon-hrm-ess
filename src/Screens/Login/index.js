import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView, ImageBackground, Alert
} from 'react-native';
import { Button, withTheme, Snackbar, Colors } from 'react-native-paper';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Context } from '../../store';
import { Login } from '../../apis';
import { TypingAnimation } from 'react-native-typing-animation';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
  const { colors } = props.theme;
  const { navigation } = props;
  const [state, dispatch] = useContext(Context);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [userNameTyping, setUserNameTyping] = useState(false);
  const [passwordTyping, setPasswordTyping] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0;


  const _typing = () => {
    return (
      <TypingAnimation
        dotColor="white"
        style={{ marginRight: 25, marginTop: -15 }}
      />
    )
  }
  useEffect(() => {
    AsyncStorage.getItem('loginData', (err, result) => {
      const login = JSON.parse(result);
      if (login === "true") {
        props.navigation.navigate('Home')
      }
    })
  }, [])
  

  const login = () => {
    if (email === '' || password === '') {
      setErrorMessage('Enter username and password');
      setSnackbarVisible(true);
    } else if (email === "info@apptest.com" && password === "bestcrm") {
      AsyncStorage.setItem("loginData", JSON.stringify("true"));
      AsyncStorage.getItem('loginData', (err, result) => {
        const login = JSON.parse(result);
        if (login === "true") {
          setEmail("")
          SetPassword("")
          props.navigation.navigate('Home')
        }
      })
    } else if (email === "Info@apptest.com" && password === "bestcrm") {
      AsyncStorage.setItem("loginData", JSON.stringify("true"));
      AsyncStorage.getItem('loginData', (err, result) => {
        const login = JSON.parse(result);
        if (login === "true") {
          setEmail("")
          SetPassword("")
          props.navigation.navigate('Home')
        }
      })
    } else {
      setErrorMessage('incorrect login details');
      setSnackbarVisible(true);
    }
    // Login(loginData).then((res) => {
    //   setIsLoading(false);
    //   if (res.data.login_status === 1) {
    //     setError(false);
    //     try {
    //       AsyncStorage.setItem(
    //         'sessionData',
    //         JSON.stringify(res.data.login_data)
    //       );
    //     } catch (error) {
    //       console.error('AsyncStorage error: ' + error.message);
    //     }
    //     navigation.navigate('Home');
    //     dispatch({ type: 'SET_SESSION', payload: res.data.login_data });
    //   } else {
    //     setIsLoading(false);
    //     dispatch({ type: 'SET_SESSION', payload: null });
    //     setError(true);
    //   }

    // }).catch(()=>{
    //   setIsLoading(false);
    //   dispatch({ type: 'SET_SESSION', payload: null });
    //   setError(true);
    // });
  };

  return (
    <ImageBackground source={require('../../../assets/8.jpg')} resizeMode="cover" style={{ flex: 1, justifyContent: 'center', }} >
      <KeyboardAvoidingView style={{ alignItems: 'center', flexDirection: 'row', flex: 1 }} behavior={(Platform.OS === 'ios') ? 'padding' : null} keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView  >
          <Animatable.View
            animation='zoomIn'
            duration={1400}
            style={styles.errorContainer}
          >
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../assets/log.png')}
                style={styles.ImageStyle}
              ></Image>
            </View>
            <View style={{ backgroundColor: "transparent", padding: 20, margin: 20, borderRadius: 10, }}>

              <Text style={styles.Login}>Sign in</Text>

              <View
                style={{
                  backgroundColor: colors.primary,
                  flexDirection: 'row',
                  borderRadius: 30,
                  width: "100%",
                  height: 45,
                  marginBottom: 20,
                  alignItems: "center",
                }}
              >
                <Ionicons name="ios-person" size={20} color={'white'} style={{ alignSelf: 'center', left: 10, opacity: .9 }}></Ionicons>
                <TextInput
                  style={{
                    height: 50,
                    flex: 1,
                    color: 'white',
                    padding: 10,
                    marginLeft: 10,
                  }}
                  placeholder="email"
                  placeholderTextColor={'#d4d4d4'}
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                  onFocus={() => { setUserNameTyping(true) }}
                  onBlur={() => { setUserNameTyping(false) }}
                />
                {userNameTyping &&
                  <View style={{ alignSelf: 'flex-end', justifyContent: 'center', marginVertical: 10, right: 10 }}>
                    {_typing()}
                  </View>
                }
              </View>
              <View
                style={{
                  backgroundColor: colors.primary,
                  flexDirection: 'row',
                  borderRadius: 30,
                  width: "100%",
                  height: 45,
                  marginBottom: 20,
                  alignItems: "center",
                }}
              >
                <Ionicons name="lock-closed" size={20} color={'white'} style={{ alignSelf: 'center', left: 10, opacity: .9 }}></Ionicons>
                <TextInput
                  style={{
                    height: 50,
                    flex: 1,
                    color: 'white',
                    padding: 10,
                    marginLeft: 10,
                  }}
                  secureTextEntry={secureTextEntry}
                  placeholder="password "
                  placeholderTextColor={'#d4d4d4'}
                  inputStyle={{ color: 'white' }}
                  onChangeText={(text) => SetPassword(text)}
                  onFocus={() => { setPasswordTyping(true) }}
                  onBlur={() => { setPasswordTyping(false) }}
                  value={password}
                  returnKeyType='done'
                />
                <View>
                  <TouchableOpacity
                    hitSlop={styles.hitSlop}
                    style={{ marginHorizontal: 10, justifyContent: 'center' }}
                    onPress={() => {
                      setsecureTextEntry(!secureTextEntry);
                    }}
                  >
                    {secureTextEntry ? (
                      <Ionicons
                        style={{}}
                        name='ios-eye-off'
                        size={20}
                        color='white'
                      />
                    ) : (
                      <Ionicons
                        style={{}}
                        name='ios-eye'
                        size={20}
                        color='white'
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={{
                flex: 1,
                width: '60%',
                height: 40,
                top: 25,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                flexDirection: 'row',
                backgroundColor: colors.secondary,
                shadowColor: 'green',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 2,
                elevation: 2,
              }} onPress={() => {
                login()
              }}>
                <Text style={{ color: colors.white, }}>LOG IN</Text>
                <Ionicons name="ios-log-in-outline" size={15} color={'#e6ffe6'} style={{ left: 10, opacity: .9 }}></Ionicons>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView >
      <Snackbar
        style={{ backgroundColor: 'white', bottom: 20, width: '90%', alignSelf: 'center' }}
        visible={snackbarVisible}
        duration={2000}
        onDismiss={() => setSnackbarVisible(false)}
        theme={{
          colors: { accent: 'red', surface: 'green' }
        }}
        action={{
          label: 'Retry',
          onPress: () => { },
        }}
      >
        {errorMessage}
      </Snackbar>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "red",
    marginTop: 20,
    marginBottom: 20,
  },
  error: {
    alignSelf: 'center',
    color: 'red',
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: 20,
    color: "black",
  },
  loginContainer: {
    flex: 1,
    width: '60%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  InputContainer: {
    width: "70%",
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 25,
  },
  errorContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: -10
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'red',
  },
  ImageStyle: {
    width: 180,
    height: 150,
    resizeMode: 'contain',
  },
  proceedWithLogin: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 20,
    color: '#6b6b69',
  },
  Login: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0c9102',
    left: 10,
    bottom: 10
  },
  personStyle: {
    marginLeft: 315,
    marginTop: -20,
  },
  personIcon: {
    marginTop: -10,
    textAlign: 'right',
    marginRight: 10,
  },
  PasswordView: {
    marginLeft: 310,
    marginTop: -20,
  },
  EyeOff: {
    marginTop: -10,
    textAlign: 'right',
    marginRight: 10,
  },
  EyeOn: {
    marginTop: -10,
    textAlign: 'right',
    marginRight: 10,
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
});




export default withTheme(LoginScreen);
