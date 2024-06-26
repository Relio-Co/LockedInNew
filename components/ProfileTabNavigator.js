import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import darkTheme from '../themes/DarkTheme';

const Tab = createMaterialTopTabNavigator();

const ProfileTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: darkTheme.accentColor,
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: darkTheme.cardColor,
        },
        indicatorStyle: {
          backgroundColor: darkTheme.accentColor,
        },
        labelStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default ProfileTabNavigator;
