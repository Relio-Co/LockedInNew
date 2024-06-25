import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FeedItem from '../components/FeedItem';
import darkTheme from '../themes/DarkTheme';

const samplePosts = [
  { id: '1', content: 'Sample Post 1', likes: 10, comments: 2, imageUrl: 'https://example.com/image1.jpg' },
  { id: '2', content: 'Sample Post 2', likes: 20, comments: 5, imageUrl: 'https://example.com/image2.jpg' },
  // Add more sample posts with imageUrl
];

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={samplePosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedItem content={item.content} likes={item.likes} comments={item.comments} imageUrl={item.imageUrl} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    paddingTop: 16,
  },
});
