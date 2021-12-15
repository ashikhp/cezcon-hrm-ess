import React, { useState, useEffect, useContext } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button, Menu, Divider, Provider, withTheme } from 'react-native-paper';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import MainTabs from '../MainTabs';
import LoginScreen from '../Login';
import { Sites } from '../Sites';
import { Context } from '../../store';

const Stack = createStackNavigator();

function App(props) {
  console.disableYellowBox = true
  const { colors } = props.theme;
  const { navigation } = props;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    AsyncStorage.getItem('sessionData', (err, result) => {
      if (
        result &&
        _.isEmpty(result) === false &&
        JSON.parse(result) &&
        JSON.parse(result).session_client_user_id
      ) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    });
  }, []);
  useEffect(() => {
    if (!state.sessionData) {
      props.navigation.dispatch(DrawerActions.closeDrawer());
      setIsLoggedin(false);
    } else {
      setIsLoggedin(true);
    }
  }, [state.sessionData]);
  return (
    <Stack.Navigator>
      {/* {!isLoggedin && ( */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* // )} */}
      {/* {isLoggedin && ( */}
      <>
        <Stack.Screen
          name="Home"
          component={MainTabs}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitle: () => <Text style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}>Cezcon HRM</Text>,
            headerLeft: () => (
              <Text
                onPress={() =>
                  navigation.dispatch(DrawerActions.openDrawer())
                }
              >
                {' '}
                <Icon name="menu" size={25} color={colors.white} />
              </Text>
            ),
          }}
        />
        <Stack.Screen
          name="Sites"
          component={Sites}
          options={{
            title: 'Select Site',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </>
      {/* )} */}
    </Stack.Navigator>
  );
}

export default withTheme(App);
