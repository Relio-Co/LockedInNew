import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import darkTheme from '../themes/DarkTheme';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: darkTheme.textColor,
    fontSize: 18,
  },
});

export default ProfileScreen;
