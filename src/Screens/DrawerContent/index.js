import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Context } from '../../store';
export function DrawerContent(props) {
  const [state, dispatch] = useContext(Context);
  const [user, setUser] = useState('')
  useEffect(() => {
    if (state.sessionData) {
      setUser(state.sessionData);
    }
  }, [state])
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: user.session_client_user_image ? user.session_client_user_image : null,
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{user.session_client_user_name}</Title>
                <Caption style={styles.caption}>{user.session_client_user_status === '1' ? 'Facility Engineer' : 'Manager'}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
       
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5
                  name="user-tie"
                  size={20}

                ></FontAwesome5>
              )}
              label="Employee"
              onPress={() => {
                props.navigation.navigate('Employee');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5
                  name="vote-yea"
                  size={20}
                ></FontAwesome5>
              )}
              label="Attendance"
              onPress={() => {
                props.navigation.navigate('Attandance');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            // dispatch({ type: 'SET_SESSION', payload: null });
            AsyncStorage.removeItem("loginData");
            AsyncStorage.getItem('loginData', (err, result) => {
              const login = JSON.parse(result);
              if (login === null) {
                props.navigation.navigate('Login')

              }
            })
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
