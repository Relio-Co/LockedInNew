import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FeedItem from '../components/FeedItem';
import darkTheme from '../themes/DarkTheme';

const samplePosts = [
  { id: '1', content: 'Sample Post 1', likes: 10, comments: 2, imageUrl: 'https://picsum.photos/300/300', username: 'User1', groupName: 'Fitness Enthusiasts' },
  { id: '2', content: 'Sample Post 2', likes: 20, comments: 5, imageUrl: 'https://picsum.photos/200', username: 'User2', groupName: 'Healthy Eating' },
  { id: '3', content: 'Sample Post 3', likes: 15, comments: 3, imageUrl: 'https://picsum.photos/300', username: 'User3', groupName: 'Yoga Lovers' },
  { id: '4', content: 'Sample Post 4', likes: 25, comments: 7, imageUrl: 'https://picsum.photos/200/300', username: 'User4', groupName: 'Cooking Masters' },
  { id: '5', content: 'Sample Post 5', likes: 5, comments: 1, imageUrl: 'https://picsum.photos/id/200/300', username: 'User5', groupName: 'Book Club' },
  { id: '6', content: 'Sample Post 6', likes: 8, comments: 0, imageUrl: 'https://picsum.photos/id/300/200', username: 'User6', groupName: 'Travel Enthusiasts' },
  { id: '7', content: 'Sample Post 7', likes: 18, comments: 4, imageUrl: 'https://picsum.photos/200/300', username: 'User7', groupName: 'Tech Geeks' },
  { id: '8', content: 'Sample Post 8', likes: 22, comments: 6, imageUrl: 'https://picsum.photos/200/300', username: 'User8', groupName: 'Fitness Enthusiasts' },
  { id: '9', content: 'Sample Post 9', likes: 30, comments: 8, imageUrl: 'https://picsum.photos/200/300', username: 'User9', groupName: 'Healthy Eating' },
  { id: '10', content: 'Sample Post 10', likes: 12, comments: 3, imageUrl: 'https://picsum.photos/200/300', username: 'User10', groupName: 'Yoga Lovers' },
];

export default function ExploreFeed({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={samplePosts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
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
    padding: 8,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
