
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from '../Screens/HomeStack';
import { DrawerContent } from '../Screens/DrawerContent';
import MainTabs from '../Screens/MainTabs';

const Drawer = createDrawerNavigator();

export default App = ({navigation}) =>  {
    return (
      <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={HomeStack} />
      </Drawer.Navigator>
    </NavigationContainer>
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