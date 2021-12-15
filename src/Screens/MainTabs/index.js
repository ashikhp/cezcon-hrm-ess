
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import home from "../../../assets/home.png"
import { FontAwesome5 } from '@expo/vector-icons'
import { useRef } from 'react';
import { withTheme } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = (props) => {
  const { colors } = props.theme;
  const { navigation } = props;
  const [state, setstate] = useState(true)
  const [line, setline] = useState(false)
  const [leftPercentage, setleftPercentage] = useState("0%")

  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <Tab.Navigator
        initialRouteName='Dashboard'
        tabBarOptions={{
          showLabel: false,
          // Floating Tab Bar...
          style: {
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 20,
            marginHorizontal: 20,
            // Max Height...
            height: 60,
            borderRadius: 10,
            // Shadow...
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10
            },
            paddingHorizontal: 20,
          }
        }}>



        <Tab.Screen name={"Employee"} component={EmployeeScreen} options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
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
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="user-tie"
                size={20}
                style={{ top: Platform.OS === "ios" ? 8 : -7 }}
                color={focused ? colors.primary : colors.secondary}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            setstate(false)
            setline(false)
            setleftPercentage("9%")
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>


        {

          // Extra Tab Screen For Action Button..
        }

        <Tab.Screen name={"Dashboard"} component={Mainscreen}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: e => {
              setline(true)
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true
              }).start();
            }
          })} options={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
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
            tabBarIcon: ({ focused }) => (

              // <TouchableOpacity>
              <View style={{
                width: 55,
                height: 55,
                backgroundColor: focused ? colors.primary : colors.secondary,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                top: -20
              }}>
                <Image source={home} style={{
                  width: 22,
                  height: 22,
                  tintColor: 'white',
                }}></Image>
              </View>
              // </TouchableOpacity>
            )
          }}
        ></Tab.Screen>

        <Tab.Screen name={"Attandance"} component={AttendanceScreen} options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
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
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="vote-yea"
                size={20}
                style={{ top: Platform.OS === "ios" ? 8 : -7 }}
                color={focused ? colors.primary : colors.secondary}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            setline(false)
            setstate(false)
            setleftPercentage("18%")
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>


      </Tab.Navigator>

      {/* <Animated.View style={{
        width: state ? 0 : getWidth() - 20,
        height: 2,
        backgroundColor: line ? "transparent" : colors.primary,
        position: 'absolute',
        bottom: Platform.OS === "ios" ? 104 : 60,
        // Horizontal Padding = 20...
        left: leftPercentage,
        borderRadius: 20,
        transform: [
          { translateX: tabOffsetValue }
        ]
      }}>

      </Animated.View> */}
      {/* <View style={{ height: Platform.OS === "ios" ? 25 : 10 }} /> */}
    </>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width

  // Horizontal Padding = 20...
  width = width - 80

  // Total five Tabs...
  return width / 5
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}
function Mainscreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard</Text>
    </View>
  );
}

function AttendanceScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Attendamce</Text>
    </View>
  );
}

function EmployeeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Employee</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(App);

