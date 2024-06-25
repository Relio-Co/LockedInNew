import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import darkTheme from '../themes/DarkTheme';

const sampleGroups = [
  { id: '1', name: 'Fitness Enthusiasts', subscribed: false, posts: [{ id: '1', content: 'Fitness Post 1', likes: 5, comments: 1, imageUrl: 'https://example.com/image1.jpg' }] },
  { id: '2', name: 'Healthy Eating', subscribed: true, posts: [{ id: '2', content: 'Healthy Post 1', likes: 15, comments: 3, imageUrl: 'https://example.com/image2.jpg' }] },
];

export default function GroupsScreen({ navigation }) {
  const handleSubscribe = (group) => {
    group.subscribed = !group.subscribed;
    // Update state or perform necessary actions
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <TouchableOpacity
              style={styles.group}
              onPress={() => navigation.navigate('GroupFeed', { group: item })}
            >
              <Text style={styles.groupText}>{item.name}</Text>
            </TouchableOpacity>
            {!item.subscribed && (
              <Button
                title="Subscribe"
                onPress={() => handleSubscribe(item)}
                color={darkTheme.accentColor}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    padding: 16,
  },
  groupContainer: {
    marginBottom: 16,
  },
  group: {
    padding: 16,
    backgroundColor: darkTheme.cardColor,
    borderRadius: 8,
    marginBottom: 8,
  },
  groupText: {
    color: darkTheme.textColor,
    fontSize: 16,
  },
});
