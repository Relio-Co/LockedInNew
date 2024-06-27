import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import darkTheme from '../themes/DarkTheme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function GroupsScreen({ navigation }) {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState('');
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        if (token) {
          const response = await axios.get(`${apiUrl}/groups`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const sortedGroups = response.data.sort((a, b) => b.subscribed - a.subscribed);
          setGroups(sortedGroups);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleSubscribe = async (groupId) => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (token) {
        const response = await axios.post(`${apiUrl}/groups/join/${groupId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const updatedGroups = groups.map(group =>
          group.group_id === groupId ? { ...group, memberCount: response.data.memberCount, subscribed: response.data.subscribed } : group
        );
        setGroups(updatedGroups.sort((a, b) => b.subscribed - a.subscribed));
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Error joining group:', error);
    }
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
        keyExtractor={(item) => item.group_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <TouchableOpacity
              style={styles.group}
              onPress={() => navigation.navigate('GroupFeed', { group: item })}
            >
              <Image source={{ uri: item.picture_url }} style={styles.avatar} />
              <View style={styles.groupInfo}>
                <Text style={styles.groupText}>{item.name}</Text>
                <Text style={styles.memberCount}>{item.members ? item.members.length : 0} members</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => handleSubscribe(item.group_id)}
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
