import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, RefreshControl } from 'react-native';
import axios from 'axios';
import darkTheme from '../themes/DarkTheme';
import ExploreFeed from './ExploreFeed';
import ForYouFeed from './ForYouFeed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FeedScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Explore');
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      console.log('JWT token:', token);
      if (!token) {
        console.error('JWT token not found');
        return;
      }
      const response = await axios.get('https://server.golockedin.com/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Fetched posts:', response.data);

      const fetchedPosts = Array.isArray(response.data) ? response.data : [];
      const sanitizedPosts = fetchedPosts.reduce((acc, post) => {
        console.log('Processing post:', post);
        if (post && typeof post === 'object') {
          const postId = post.post_id;
          if (postId !== undefined && postId !== null) {
            acc.push({
              id: String(postId),
              caption: post.caption || '',
              imageUrl: post.image_url || '',
              createdBy: post.created_by || 'anonymous',
              createdByUsername: post.created_by_username || 'anonymous',
              createdAt: post.created_at ? new Date(post.created_at).toISOString() : 'unknown',
              isPublic: post.is_public !== undefined ? post.is_public : true,
            });
          } else {
            console.error('Invalid post_id:', postId);
          }
        } else {
          console.error('Invalid post object:', post);
        }
        return acc;
      }, []);

      console.log('Sanitized posts:', sanitizedPosts);
      setPosts(sanitizedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Explore')} style={[styles.tabButton, activeTab === 'Explore' && styles.activeTab]}>
          <Text style={styles.tabText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('For You')} style={[styles.tabButton, activeTab === 'For You' && styles.activeTab]}>
          <Text style={styles.tabText}>For You</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'Explore' ? (
        <ExploreFeed
          navigation={navigation}
          posts={posts}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <ForYouFeed />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    paddingTop: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: darkTheme.accentColor,
  },
  tabText: {
    color: darkTheme.textColor,
    fontSize: 16,
  },
});
