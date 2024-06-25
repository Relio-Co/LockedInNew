import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import darkTheme from '../themes/DarkTheme';

const sampleFriends = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  // Add more sample friends
];

export default function FriendsScreen() {
  const [friends, setFriends] = useState(sampleFriends);
  const [newFriend, setNewFriend] = useState('');

  const addFriend = () => {
    if (newFriend) {
      setFriends([...friends, { id: Date.now().toString(), name: newFriend }]);
      setNewFriend('');
    }
  };

  const inviteToGroup = (friend) => {
    // Implement group invitation functionality here
    alert(`Invited ${friend.name} to the group`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new friend"
        placeholderTextColor={darkTheme.textColor}
        value={newFriend}
        onChangeText={setNewFriend}
      />
      <Button title="Add Friend" onPress={addFriend} color={darkTheme.accentColor} />
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendName}>{item.name}</Text>
            <TouchableOpacity style={styles.inviteButton} onPress={() => inviteToGroup(item)}>
              <Text style={styles.inviteButtonText}>Invite to Group</Text>
            </TouchableOpacity>
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
  input: {
    backgroundColor: darkTheme.cardColor,
    color: darkTheme.textColor,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: darkTheme.cardColor,
    borderRadius: 8,
    marginBottom: 8,
  },
  friendName: {
    color: darkTheme.textColor,
    fontSize: 16,
  },
  inviteButton: {
    backgroundColor: darkTheme.accentColor,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  inviteButtonText: {
    color: darkTheme.textColor,
  },
});
