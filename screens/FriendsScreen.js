import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import darkTheme from '../themes/DarkTheme';

// Get the API URL from environment variables
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Create an axios instance
const api = axios.create({
  baseURL: apiUrl,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function FriendsScreen() {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchFriendRequests = async () => {
    try {
      const response = await api.get('/friends/requests');
      setFriendRequests(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error('Error fetching friend requests:', error.response ? error.response.data : error.message);
    }
  };

  const searchUsers = async () => {
    try {
      const response = await api.get(`/friends/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error('Error searching users:', error.response ? error.response.data : error.message);
    }
  };

  const sendFriendRequest = async (receiverUuid) => {
    try {
      const response = await fetch(`${apiUrl}/friends/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('jwt_token')}`,
        },
        body: JSON.stringify({ receiverUuid }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      console.log('Friend request sent:', data);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      await api.post(`/friends/requests/${requestId}/accept`);
      fetchFriendRequests();
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error('Error accepting friend request:', error.response ? error.response.data : error.message);
    }
  };

  const rejectFriendRequest = async (requestId) => {
    try {
      await api.post(`/friends/requests/${requestId}/reject`);
      fetchFriendRequests();
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error('Error rejecting friend request:', error.response ? error.response.data : error.message);
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.profile_picture }} style={styles.profilePicture} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => sendFriendRequest(item.uuid)}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFriendRequestItem = ({ item }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.Sender.profile_picture }} style={styles.profilePicture} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.Sender.username}</Text>
        <Text style={styles.name}>{item.Sender.name}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.acceptButton} onPress={() => acceptFriendRequest(item.request_id)}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={() => rejectFriendRequest(item.request_id)}>
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

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {JSON.stringify(error)}</Text>
        </View>
      )}

      {friendRequests.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Friend Requests</Text>
          <FlatList
            data={friendRequests}
            keyExtractor={(item) => item.request_id.toString()}
            renderItem={renderFriendRequestItem}
            scrollEnabled={false}
          />
        </View>
      )}

      {searchResults.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Results</Text>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={renderUserItem}
            scrollEnabled={false}
          />
        </View>
      )}
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
  errorContainer: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
