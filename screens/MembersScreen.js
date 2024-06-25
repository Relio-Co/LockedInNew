// MembersScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import darkTheme from '../themes/DarkTheme';

const sampleMembers = [
  { id: '1', name: 'Alice', isAdmin: false },
  { id: '2', name: 'Bob', isAdmin: true },
  // Add more sample members
];

export default function MembersScreen({ route }) {
  const { group } = route.params;
  const [members, setMembers] = useState(sampleMembers);
  const [isAdmin, setIsAdmin] = useState(false); // Toggle for admin actions

  const toggleAdmin = (memberId) => {
    const updatedMembers = members.map(member =>
      member.id === memberId ? { ...member, isAdmin: !member.isAdmin } : member
    );
    setMembers(updatedMembers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.groupName}>{group.name} Members</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text style={styles.memberName}>{item.name}</Text>
            <TouchableOpacity
              style={[styles.adminButton, item.isAdmin && styles.isAdminButton]}
              onPress={() => toggleAdmin(item.id)}
            >
              <Text style={styles.adminButtonText}>{item.isAdmin ? 'Remove Admin' : 'Make Admin'}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.toggleButton} onPress={() => setIsAdmin(!isAdmin)}>
        <Text style={styles.toggleButtonText}>{isAdmin ? 'Switch to Non-Admin View' : 'Switch to Admin View'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    padding: 16,
    paddingTop: 50,
  },
  groupName: {
    color: darkTheme.textColor,
    fontSize: 18,
    marginBottom: 16,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: darkTheme.cardColor,
    borderRadius: 8,
    marginBottom: 8,
  },
  memberName: {
    color: darkTheme.textColor,
    fontSize: 16,
  },
  adminButton: {
    backgroundColor: darkTheme.accentColor,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  isAdminButton: {
    backgroundColor: darkTheme.buttonColor,
  },
  adminButtonText: {
    color: darkTheme.buttonTextColor,
  },
  toggleButton: {
    backgroundColor: darkTheme.accentColor,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  toggleButtonText: {
    color: darkTheme.buttonTextColor,
    textAlign: 'center',
  },
});
