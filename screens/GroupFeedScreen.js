import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FeedItem from '../components/FeedItem';
import darkTheme from '../themes/DarkTheme';

export default function GroupFeedScreen({ route }) {
  const { group } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={group.posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedItem content={item.content} likes={item.likes} comments={item.comments} />
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
