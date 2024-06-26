// PostDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import darkTheme from '../themes/DarkTheme';
import { Ionicons } from '@expo/vector-icons';

const deviceWidth = Dimensions.get('window').width;

const sampleComments = [
  { id: '1', user: 'User1', comment: 'Nice post!' },
  { id: '2', user: 'User2', comment: 'Great content!' },
  // Add more sample comments
];

export default function PostDetailScreen({ route, navigation }) {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={darkTheme.textColor} />
      </TouchableOpacity>
      <Image source={{ uri: post.imageUrl }} style={styles.image} />
      <Text style={styles.content}>{post.content}</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Likes: {post.likes}</Text>
        <Text style={styles.footerText}>Comments: {post.comments}</Text>
        <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('Report', { data: post })}>
          <Ionicons name="alert-circle-outline" size={24} color={darkTheme.textColor} />
        </TouchableOpacity>
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
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 16,
  },
  image: {
    width: deviceWidth - 32,
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
  reportButton: {
    marginLeft: 16,
  },
});
