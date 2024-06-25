import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import MainNavigator from './navigation/MainNavigator';
import darkTheme from './themes/DarkTheme';
import PostScreen from './screens/PostScreen';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: darkTheme.backgroundColor,
    card: darkTheme.cardColor,
    text: darkTheme.textColor,
    border: darkTheme.borderColor,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Post" component={PostScreen} options={{ headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}