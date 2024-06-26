import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import darkTheme from '../themes/DarkTheme';

const deviceWidth = Dimensions.get('window').width;

export default function FeedItem({ content, likes, comments, imageUrl, onPress, username, groupName }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.groupName}>{groupName}</Text>
      <Text style={styles.username}>Posted by {username}</Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Likes: {likes}</Text>
        <Text style={styles.footerText}>Comments: {comments}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
    width: (deviceWidth / 2) - 16,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: deviceWidth * 0.5, // Adjusted height for better appearance
    borderRadius: 16,
    marginBottom: 8,
  },
  groupName: {
    color: darkTheme.accentColor,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  username: {
    color: darkTheme.textColor,
    marginBottom: 4,
  },
  content: {
    color: darkTheme.textColor,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: darkTheme.accentColor,
  },
});
