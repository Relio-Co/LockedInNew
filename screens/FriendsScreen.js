import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import darkTheme from '../themes/DarkTheme';

const sampleFriends = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  // Add more sample friends
];

const sampleGroups = [
  { id: '1', name: 'Fitness Enthusiasts' },
  { id: '2', name: 'Healthy Eating' },
  // Add more sample groups
];

export default function FriendsScreen() {
  const [friends, setFriends] = useState(sampleFriends);
  const [newFriend, setNewFriend] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(sampleGroups[0].id);

  const addFriend = () => {
    if (newFriend) {
      setFriends([...friends, { id: Date.now().toString(), name: newFriend }]);
      setNewFriend('');
    }
  };

  const inviteToGroup = (friend) => {
    alert(`Invited ${friend.name} to the group ${sampleGroups.find(group => group.id === selectedGroup).name}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new friend"
        placeholderTextColor={darkTheme.placeholderColor}
        value={newFriend}
        onChangeText={setNewFriend}
      />
      <Button title="Add Friend" onPress={addFriend} color={darkTheme.accentColor} />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Group:</Text>
        <View style={styles.picker}>
          {sampleGroups.map(group => (
            <TouchableOpacity
              key={group.id}
              style={[styles.pickerItem, selectedGroup === group.id && styles.selectedPickerItem]}
              onPress={() => setSelectedGroup(group.id)}
            >
              <Text style={styles.pickerItemText}>{group.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    paddingTop: 50,
  },
  input: {
    backgroundColor: darkTheme.cardColor,
    color: darkTheme.textColor,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    color: darkTheme.textColor,
    marginBottom: 8,
  },
  picker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pickerItem: {
    backgroundColor: darkTheme.cardColor,
    padding: 8,
    borderRadius: 8,
    margin: 4,
  },
  selectedPickerItem: {
    backgroundColor: darkTheme.accentColor,
  },
  pickerItemText: {
    color: darkTheme.textColor,
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
