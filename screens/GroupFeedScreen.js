import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FeedItem from '../components/FeedItem';
import darkTheme from '../themes/DarkTheme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export function GroupFeedScreen({ route, navigation }) {
  const { group } = route.params;
  const [isSubscribed, setIsSubscribed] = useState(group.subscribed);
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        if (token) {
          const response = await axios.get(`https://server.golockedin.com/groups/${group.group_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPosts(response.data.posts);
          setMembers(response.data.members);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [group.group_id]);

  const handleSubscribe = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (token) {
        const response = await axios.post(`https://server.golockedin.com/groups/join/${group.group_id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsSubscribed(response.data.subscribed);
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={darkTheme.textColor} />
        </TouchableOpacity>
        <Text style={styles.groupTitle}>{group.name}</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedItem
            content={item.content}
            likes={item.likes}
            comments={item.comments}
            imageUrl={item.imageUrl}
            onPress={() => navigation.navigate('PostDetail', { post: item })}
            username={item.username}
            groupName={item.groupName}
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />
      {!isSubscribed && (
        <TouchableOpacity style={styles.joinGroupButton} onPress={handleSubscribe}>
          <Text style={styles.joinGroupButtonText}>Join Group</Text>
        </TouchableOpacity>
      )}
      <View style={styles.dock}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Members', { group })}>
          <Ionicons name="people-outline" size={24} color={darkTheme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* navigate to admin screen */}}>
          <Ionicons name="settings-outline" size={24} color={darkTheme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* navigate to chat screen */}}>
          <Ionicons name="chatbubble-outline" size={24} color={darkTheme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Post')}>
          <Ionicons name="create-outline" size={24} color={darkTheme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Report', { data: group })}>
          <Ionicons name="alert-circle-outline" size={24} color={darkTheme.textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    paddingTop: 50,
  },
  header: {
    backgroundColor: darkTheme.cardColor,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  groupTitle: {
    color: darkTheme.textColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingBottom: 80, // Add padding to prevent content being hidden behind the dock
  },
  dock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: darkTheme.cardColor,
    borderTopWidth: 1,
    borderTopColor: darkTheme.borderColor,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  joinGroupButton: {
    position: 'absolute',
    bottom: 80,
    left: 30,
    backgroundColor: darkTheme.accentColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  joinGroupButtonText: {
    color: darkTheme.buttonTextColor,
    fontSize: 14,
  },
});

export default GroupFeedScreen;
