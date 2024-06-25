import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import darkTheme from '../themes/DarkTheme';

const sampleNotifications = [
  { id: '1', type: 'Like', message: 'User1 liked your post.' },
  { id: '2', type: 'Comment', message: 'User2 commented on your post.' },
  { id: '3', type: 'Follow', message: 'User3 started following you.' },
  { id: '4', type: 'Group', message: 'New post in Fitness Enthusiasts group.', groupId: '1' },
  { id: '5', type: 'Mention', message: 'User4 mentioned you in a comment.' },
];

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationContainer}
      onPress={() => {
        if (item.type === 'Group' && item.groupId) {
          navigation.navigate('GroupFeed', { groupId: item.groupId });
        }
      }}
    >
      <Text style={styles.notificationText}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={notifications}
        renderItem={renderNotification}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteNotification(data.item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    paddingTop: 50,
  },
  notificationContainer: {
    backgroundColor: darkTheme.cardColor,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.borderColor,
  },
  notificationText: {
    color: darkTheme.textColor,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: darkTheme.errorColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  deleteButton: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: darkTheme.textColor,
  },
});
