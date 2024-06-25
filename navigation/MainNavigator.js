import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import GroupsScreen from '../screens/GroupsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import PostScreen from '../screens/PostScreen';
import GroupFeedScreen from '../screens/GroupFeedScreen';
import darkTheme from '../themes/DarkTheme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GroupsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Groups" component={GroupsScreen} />
      <Stack.Screen name="GroupFeed" component={GroupFeedScreen} />
    </Stack.Navigator>
  );
}

function MainNavigator({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Groups" component={GroupsStack} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
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
