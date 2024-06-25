import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FeedItem from '../components/FeedItem';
import darkTheme from '../themes/DarkTheme';

const samplePosts = [
  { id: '1', content: 'Group Post 1', likes: 15, comments: 3, imageUrl: 'https://picsum.photos/200/300', username: 'User1', groupName: 'Fitness Enthusiasts' },
  { id: '2', content: 'Group Post 2', likes: 25, comments: 7, imageUrl: 'https://picsum.photos/200/300', username: 'User2', groupName: 'Healthy Eating' },
];

export  function GroupFeedScreen({ route, navigation }) {
  const { group } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.groupTitle}>{group.name}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => {/* navigate to members screen */}}>
            <Ionicons name="people-outline" size={24} color={darkTheme.textColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {/* navigate to admin screen */}}>
            <Ionicons name="settings-outline" size={24} color={darkTheme.textColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {/* navigate to chat screen */}}>
            <Ionicons name="chatbubble-outline" size={24} color={darkTheme.textColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Post')}>
            <Ionicons name="create-outline" size={24} color={darkTheme.textColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {/* navigate to report screen */}}>
            <Ionicons name="alert-circle-outline" size={24} color={darkTheme.textColor} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={samplePosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedItem
            content={item.content}
            likes={item.likes}
            comments={item.comments}
            imageUrl={item.imageUrl}
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
  header: {
    backgroundColor: darkTheme.cardColor,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.borderColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupTitle: {
    color: darkTheme.textColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 5,
  },
});

export default GroupFeedScreen;
