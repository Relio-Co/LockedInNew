import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';
import darkTheme from '../themes/DarkTheme';

const sampleGroups = [
  { id: '1', name: 'Fitness Enthusiasts', subscribed: false, members: 120 },
  { id: '2', name: 'Healthy Eating', subscribed: true, members: 98 },
  // Add more sample groups
];

export default function GroupsScreen({ navigation }) {
  const [groups, setGroups] = useState(sampleGroups);
  const [search, setSearch] = useState('');

  const handleSubscribe = (groupId) => {
    const updatedGroups = groups.map(group => 
      group.id === groupId ? { ...group, subscribed: !group.subscribed } : group
    );
    setGroups(updatedGroups);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Groups"
        placeholderTextColor={darkTheme.placeholderColor}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <TouchableOpacity
              style={styles.group}
              onPress={() => navigation.navigate('GroupFeed', { group: item })}
            >
              <Text style={styles.groupText}>{item.name}</Text>
              <Text style={styles.memberCount}>{item.members} members</Text>
            </TouchableOpacity>
            <Button
              title={item.subscribed ? "Unsubscribe" : "Subscribe"}
              onPress={() => handleSubscribe(item.id)}
              color={darkTheme.accentColor}
            />
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
  searchBar: {
    backgroundColor: darkTheme.inputBackgroundColor,
    color: darkTheme.textColor,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  groupContainer: {
    marginBottom: 16,
  },
  group: {
    padding: 16,
    backgroundColor: darkTheme.cardColor,
    borderRadius: 8,
    marginBottom: 8,
  },
  groupText: {
    color: darkTheme.textColor,
    fontSize: 16,
  },
  memberCount: {
    color: darkTheme.placeholderColor,
    fontSize: 12,
  },
});
