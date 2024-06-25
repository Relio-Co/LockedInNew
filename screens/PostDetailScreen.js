import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import darkTheme from '../themes/DarkTheme';

const deviceWidth = Dimensions.get('window').width;

const sampleComments = [
  { id: '1', user: 'User1', comment: 'Nice post!' },
  { id: '2', user: 'User2', comment: 'Great content!' },
  // Add more sample comments
];

export default function PostDetailScreen({ route }) {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: post.imageUrl }} style={styles.image} />
      <Text style={styles.content}>{post.content}</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Likes: {post.likes}</Text>
        <Text style={styles.footerText}>Comments: {post.comments}</Text>
      </View>
      <FlatList
        data={sampleComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentUser}>{item.user}</Text>
            <Text style={styles.commentText}>{item.comment}</Text>
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
  },
  image: {
    width: deviceWidth - 32, // Account for padding
    height: 200,
    borderRadius: 16,
    marginBottom: 8,
  },
  content: {
    color: darkTheme.textColor,
    marginBottom: 8,
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  footerText: {
    color: darkTheme.accentColor,
  },
  commentContainer: {
    backgroundColor: darkTheme.cardColor,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentUser: {
    color: darkTheme.accentColor,
    marginBottom: 4,
  },
  commentText: {
    color: darkTheme.textColor,
  },
});
