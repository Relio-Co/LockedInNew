import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import darkTheme from '../themes/DarkTheme';

const sampleGroups = [
  { id: '1', name: 'Fitness Enthusiasts', subscribed: false, members: 120, avatar: 'https://picsum.photos/50/50' },
  { id: '2', name: 'Healthy Eating', subscribed: true, members: 98, avatar: 'https://picsum.photos/50/50' },
  // Add more sample groups
];

const { width, height } = Dimensions.get('window');

export default function GroupsScreen({ navigation }) {
  const [groups, setGroups] = useState(sampleGroups);
  const [search, setSearch] = useState('');

  const handleSubscribe = (groupId) => {
    const updatedGroups = groups.map(group => 
      group.id === groupId ? { ...group, subscribed: !group.subscribed } : group
    );
    setGroups(updatedGroups);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Groups"
        placeholderTextColor={darkTheme.placeholderColor}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <TouchableOpacity
              style={styles.group}
              onPress={() => navigation.navigate('GroupFeed', { group: item })}
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.groupInfo}>
                <Text style={styles.groupText}>{item.name}</Text>
                <Text style={styles.memberCount}>{item.members} members</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.subscribeButton, item.subscribed && styles.subscribedButton]}
              onPress={() => handleSubscribe(item.id)}
            >
              <Text style={styles.subscribeButtonText}>{item.subscribed ? "Unsubscribe" : "Subscribe"}</Text>
            </TouchableOpacity>
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
    paddingTop: 50,
  },
  searchBar: {
    backgroundColor: darkTheme.inputBackgroundColor,
    color: darkTheme.textColor,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
    backgroundColor: darkTheme.cardColor,
    borderRadius: 8,
    width: '100%',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: width * 0.1, // Responsive size
    height: width * 0.1, // Responsive size
    borderRadius: (width * 0.1) / 2,
    marginRight: 16,
  },
  groupInfo: {
    flex: 1,
  },
  groupText: {
    color: darkTheme.textColor,
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
  },
  memberCount: {
    color: darkTheme.placeholderColor,
    fontSize: width * 0.035, // Responsive font size
  },
  subscribeButton: {
    backgroundColor: darkTheme.accentColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  subscribedButton: {
    backgroundColor: darkTheme.buttonColor,
  },
  subscribeButtonText: {
    color: darkTheme.buttonTextColor,
    fontSize: width * 0.035, // Responsive font size
  },
});
