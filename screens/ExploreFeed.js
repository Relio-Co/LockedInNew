import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FeedItem from '../components/FeedItem';
import darkTheme from '../themes/DarkTheme';

const samplePosts = [
  { id: '1', content: 'Sample Post 1', likes: 10, comments: 2, imageUrl: 'https://picsum.photos/200/300', username: 'User1', groupName: 'Fitness Enthusiasts' },
  { id: '2', content: 'Sample Post 2', likes: 20, comments: 5, imageUrl: 'https://picsum.photos/200/300', username: 'User2', groupName: 'Healthy Eating' },
  // Add more sample posts with imageUrl
];

export default function ExploreFeed({ navigation }) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
  },
});
