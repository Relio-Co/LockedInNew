import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions,  TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FeedItem from '../components/FeedItem';
import darkTheme from '../themes/DarkTheme';

const samplePosts = [
  { id: '1', content: 'Group Post 1', likes: 15, comments: 3, imageUrl: 'https://picsum.photos/200/300', username: 'User1', groupName: 'Fitness Enthusiasts' },
  { id: '2', content: 'Group Post 2', likes: 25, comments: 7, imageUrl: 'https://picsum.photos/200/300', username: 'User2', groupName: 'Healthy Eating' },
];

export function GroupFeedScreen({ route, navigation }) {
  const { group } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={darkTheme.textColor} />
        </TouchableOpacity>
        <Text style={styles.groupTitle}>{group.name}</Text>
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
            onPress={() => navigation.navigate('PostDetail', { post: item })}
            username={item.username}
            groupName={item.groupName}
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.dock}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Members', { group })}>
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Report', { data: group })}>
          <Ionicons name="alert-circle-outline" size={24} color={darkTheme.textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    paddingTop: 50,
  },
  header: {
    backgroundColor: darkTheme.cardColor,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  groupTitle: {
    color: darkTheme.textColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingBottom: 80, // Add padding to prevent content being hidden behind the dock
  },
  dock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: darkTheme.cardColor,
    borderTopWidth: 1,
    borderTopColor: darkTheme.borderColor,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});

export default GroupFeedScreen;
