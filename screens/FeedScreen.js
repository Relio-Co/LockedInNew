import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import FeedItem from '../components/FeedItem';
import darkTheme from '../themes/DarkTheme';


const deviceWidth = Dimensions.get('window').width;

const samplePosts = [
  { id: '1', content: 'Sample Post 1', likes: 10, comments: 2, imageUrl: 'https://picsum.photos/200/300', username: 'User1', groupName: 'Fitness Enthusiasts' },
  { id: '2', content: 'Sample Post 2', likes: 20, comments: 5, imageUrl: 'https://picsum.photos/200/300', username: 'User2', groupName: 'Healthy Eating' },
  // Add more sample posts with imageUrl
];

const sampleGroups = [
  { id: '1', name: 'Fitness Enthusiasts', members: 120, profileImages: ['https://picsum.photos/50/50', 'https://picsum.photos/50/50'], taskCompletion: [true, false, true, false, true, true, false, true] },
  { id: '2', name: 'Healthy Eating', members: 98, profileImages: ['https://picsum.photos/50/50', 'https://picsum.photos/50/50'], taskCompletion: [false, true, false, true, false, false, true, true] },
  // Add more sample groups
];

export default function FeedScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Explore');

  const renderExploreFeed = () => (
    <FlatList
      data={samplePosts}
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
    />
  );

  const renderForYouFeed = () => (
    <FlatList
      data={sampleGroups}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.groupContainer}>
          <Text style={styles.groupName}>{item.name}</Text>
          <FlatList
            data={item.profileImages}
            horizontal
            renderItem={({ item: imageUrl }) => (
              <Image source={{ uri: imageUrl }} style={styles.profileImage} />
            )}
            keyExtractor={(image, index) => index.toString()}
          />
          <FlatList
            data={item.taskCompletion}
            horizontal
            renderItem={({ item: status, index }) => (
              <View style={[styles.taskIndicator, { backgroundColor: status ? 'green' : 'red' }]} />
            )}
            keyExtractor={(status, index) => index.toString()}
          />
        </View>
      )}
    />
  );

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
      {activeTab === 'Explore' ? renderExploreFeed() : renderForYouFeed()}
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
  groupContainer: {
    padding: 16,
    backgroundColor: darkTheme.cardColor,
    borderRadius: 8,
    marginBottom: 16,
  },
  groupName: {
    color: darkTheme.textColor,
    fontSize: 18,
    marginBottom: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  taskIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    marginTop: 8,
  },
});
