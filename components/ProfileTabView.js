import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FeedScreen from '../screens/FeedScreen';
import GroupsScreen from '../screens/GroupsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileTabNavigator from '../components/ProfileTabNavigator';
import darkTheme from '../themes/DarkTheme';

const Tab = createBottomTabNavigator();

function MainNavigator({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Feed') {
              iconName = 'grid';
            } else if (route.name === 'Friends') {
              iconName = 'search';
            } else if (route.name === 'Groups') {
              iconName = 'people';
            } else if (route.name === 'ProfileTab') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: darkTheme.accentColor,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: darkTheme.backgroundColor,
          },
          tabBarShowLabel: false, // Remove text labels
        })}
      >
        <Tab.Screen name="Feed" options={{ headerShown: false }} component={FeedScreen} />
        <Tab.Screen name="Friends" options={{ headerShown: false }} component={FriendsScreen} />
        <Tab.Screen name="Groups" options={{ headerShown: false }} component={GroupsScreen} />
        <Tab.Screen name="ProfileTab" options={{ headerShown: false }} component={ProfileTabNavigator} />
      </Tab.Navigator>
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => navigation.navigate('Post')}
      >
        <Text style={styles.postButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  postButton: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    backgroundColor: darkTheme.accentColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  postButtonText: {
    color: darkTheme.textColor,
    fontSize: 30,
  },
});

export default MainNavigator;
