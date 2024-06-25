import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import darkTheme from '../themes/DarkTheme';

const sampleGroups = [
  { id: '1', name: 'Fitness Enthusiasts', subscribed: false, members: 120, avatar: 'https://picsum.photos/50/50' },
  { id: '2', name: 'Healthy Eating', subscribed: true, members: 98, avatar: 'https://picsum.photos/50/50' },
  { id: '3', name: 'Morning Runners', subscribed: false, members: 75, avatar: 'https://picsum.photos/50/50' },
  { id: '4', name: 'Yoga Lovers', subscribed: true, members: 42, avatar: 'https://picsum.photos/50/50' },
  { id: '5', name: 'Mindful Meditation', subscribed: false, members: 81, avatar: 'https://picsum.photos/50/50' },
  { id: '6', name: 'Daily Gratitude', subscribed: true, members: 65, avatar: 'https://picsum.photos/50/50' },
  { id: '7', name: 'Book Club', subscribed: false, members: 56, avatar: 'https://picsum.photos/50/50' },
  { id: '8', name: 'Language Learners', subscribed: true, members: 91, avatar: 'https://picsum.photos/50/50' },
  { id: '9', name: 'Creative Writing', subscribed: false, members: 38, avatar: 'https://picsum.photos/50/50' },
  { id: '10', name: 'Guitar Players', subscribed: true, members: 72, avatar: 'https://picsum.photos/50/50' },
  { id: '11', name: 'Photography Enthusiasts', subscribed: false, members: 49, avatar: 'https://picsum.photos/50/50' },
  { id: '12', name: 'Cooking Classes', subscribed: true, members: 85, avatar: 'https://picsum.photos/50/50' },
  { id: '13', name: 'Travel Bloggers', subscribed: false, members: 62, avatar: 'https://picsum.photos/50/50' },
  { id: '14', name: ' Coding Community', subscribed: true, members: 95, avatar: 'https://picsum.photos/50/50' },
  { id: '15', name: 'Gardening Gurus', subscribed: false, members: 44, avatar: 'https://picsum.photos/50/50' },
  { id: '16', name: 'Volunteer Network', subscribed: true, members: 80, avatar: 'https://picsum.photos/50/50' },
  { id: '17', name: 'Hiking Adventures', subscribed: false, members: 67, avatar: 'https://picsum.photos/50/50' },
  { id: '18', name: 'Wellness Warriors', subscribed: true, members: 58, avatar: 'https://picsum.photos/50/50' },
  { id: '19', name: 'Mediterranean Diet', subscribed: false, members: 53, avatar: 'https://picsum.photos/50/50' },
  { id: '20', name: 'French Language', subscribed: true, members: 93, avatar: 'https://picsum.photos/50/50' },
  { id: '21', name: 'Journaling Journey', subscribed: false, members: 46, avatar: 'https://picsum.photos/50/50' },
  { id: '22', name: 'Cycling Club', subscribed: true, members: 89, avatar: 'https://picsum.photos/50/50' },
  { id: '23', name: 'Vegan Lifestyle', subscribed: false, members: 51, avatar: 'https://picsum.photos/50/50' },
  { id: '24', name: 'Spanish Language', subscribed: true, members: 96, avatar: 'https://picsum.photos/50/50' },
  { id: '25', name: 'Swimming Squad', subscribed: false, members: 70, avatar: 'https://picsum.photos/50/50' },
  { id: '26', name: 'Art Enthusiasts', subscribed: true, members: 83, avatar: 'https://picsum.photos/50/50' },
  // Add more sample groups
];

const { width } = Dimensions.get('window');

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
              style={styles.joinButton}
              onPress={() => handleSubscribe(item.id)}
            >
              <Text style={styles.joinButtonText}>{item.subscribed ? "Unsubscribe" : "Join"}</Text>
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
    borderRadius: 30,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 8,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  groupInfo: {
    flex: 1,
  },
  groupText: {
    color: darkTheme.textColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberCount: {
    color: darkTheme.placeholderColor,
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: darkTheme.accentColor,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: darkTheme.buttonTextColor,
    fontSize: 14,
  },
});
