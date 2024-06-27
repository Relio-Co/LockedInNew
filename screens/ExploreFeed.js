import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import FeedItem from '../components/FeedItem';
import darkTheme from '../themes/DarkTheme';

export default function ExploreFeed({ navigation, posts, refreshControl }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id} // Use the sanitized `id` property
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <FeedItem
            content={item.caption}
            likes={item.likes || 0}
            comments={item.comments || 0}
            imageUrl={item.imageUrl} // Use the sanitized `imageUrl` property
            onPress={() => navigation.navigate('PostDetail', { post: item })}
            username={item.createdByUsername} // Use the sanitized `createdByUsername` property
            groupName={item.group_id ? item.group_id.toString() : 'unknown'} // Handle potential `undefined` `group_id`
          />
        )}
        refreshControl={refreshControl}
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
