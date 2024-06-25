import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import darkTheme from '../themes/DarkTheme';

const deviceWidth = Dimensions.get('window').width;

export default function FeedItem({ content, likes, comments, imageUrl }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.content}>{content}</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Likes: {likes}</Text>
        <Text style={styles.footerText}>Comments: {comments}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkTheme.cardColor,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: deviceWidth / 2,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 16,
    marginBottom: 8,
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
