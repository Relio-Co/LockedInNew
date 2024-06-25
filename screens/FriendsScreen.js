import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import darkTheme from '../themes/DarkTheme';

const sampleUsers = [
  { id: '1', name: 'Alice', username: 'alice123', profilePicture: 'https://picsum.photos/200' },
  { id: '2', name: 'Bob', username: 'bob456', profilePicture: 'https://picsum.photos/200' },
  // Add more sample users
];

const sampleFriendRequests = [
  { id: '3', name: 'Charlie', username: 'charlie789', profilePicture: 'https://picsum.photos/200' },
  { id: '4', name: 'Dana', username: 'dana101', profilePicture: 'https://picsum.photos/200' },
  // Add more sample friend requests
];

export default function FriendsScreen() {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState(sampleFriendRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Simulate search results
    const results = sampleUsers.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  const addFriend = (user) => {
    if (!friends.some(friend => friend.id === user.id)) {
      setFriends([...friends, user]);
      setSearchResults(searchResults.filter(result => result.id !== user.id));
    }
  };

  const acceptFriendRequest = (friend) => {
    setFriends([...friends, friend]);
    setFriendRequests(friendRequests.filter(request => request.id !== friend.id));
  };

  const rejectFriendRequest = (friend) => {
    setFriendRequests(friendRequests.filter(request => request.id !== friend.id));
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => addFriend(item)}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFriendRequestItem = ({ item }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.acceptButton} onPress={() => acceptFriendRequest(item)}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={() => rejectFriendRequest(item)}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for friends"
        placeholderTextColor={darkTheme.placeholderColor}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {friendRequests.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Friend Requests</Text>
          <FlatList
            data={friendRequests}
            keyExtractor={(item) => item.id}
            renderItem={renderFriendRequestItem}
            scrollEnabled={false}
          />
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search Results</Text>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
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
    backgroundColor: darkTheme.cardColor,
    color: darkTheme.textColor,
    borderRadius: 30,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: darkTheme.textColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: darkTheme.cardColor,
    borderRadius: 8,
    marginBottom: 8,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    color: darkTheme.textColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    color: darkTheme.placeholderColor,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: darkTheme.accentColor,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addButtonText: {
    color: darkTheme.buttonTextColor,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'green',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: darkTheme.buttonTextColor,
    fontWeight: 'bold',
  },
});