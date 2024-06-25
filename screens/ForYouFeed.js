import React from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import darkTheme from '../themes/DarkTheme';

const { width } = Dimensions.get('window');

const sampleGroups = [
  {
    id: '1',
    name: '#FitnessEnthusiasts',
    score: 85,
    members: [
      { id: '1', name: 'Alice', hasPosted: true, imageUrl: 'https://picsum.photos/200/200', score: 50 },
      { id: '2', name: 'Bob', hasPosted: false, imageUrl: 'https://picsum.photos/50/50', score: 30 },
    ],
    allPosted: false,
    completed: '6/8 completed',
  },
  {
    id: '2',
    name: '#HealthyEating',
    score: 92,
    members: [
      { id: '1', name: 'Charlie', hasPosted: true, imageUrl: 'https://picsum.photos/200/200', score: 70 },
      { id: '2', name: 'Dana', hasPosted: true, imageUrl: 'https://picsum.photos/200/200', score: 60 },
    ],
    allPosted: true,
    completed: '10/10 completed',
  },
];

const ForYouFeed = () => {
  const renderMemberItem = ({ item }) => (
    <View style={styles.memberContainer}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={item.hasPosted ? styles.memberPostImage : styles.memberImage} 
        accessibilityLabel={`Profile picture of ${item.name}`}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity 
          style={styles.iconButton}
          accessibilityLabel={`Nudge ${item.name}`}
          accessibilityRole="button"
        >
          <Ionicons name="hand-left-outline" size={20} color={darkTheme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          accessibilityLabel={`Blame ${item.name}`}
          accessibilityRole="button"
        >
          <Ionicons name="close-circle-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.scoreBadge}>
        <Text style={styles.scoreText}>{item.score}</Text>
      </View>
    </View>
  );

  const renderGroupItem = ({ item }) => (
    <View style={[styles.groupContainer, item.allPosted && styles.allPostedContainer]}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.groupScore}>💎 {item.score}</Text>
      </View>
      <Text style={styles.groupCompletion}>{item.completed}</Text>
      {item.allPosted && (
        <View style={styles.lockIconContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="orange" />
        </View>
      )}
      <FlatList
        data={item.members}
        keyExtractor={(member) => member.id}
        renderItem={renderMemberItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.membersList}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={sampleGroups}
        keyExtractor={(group) => group.id}
        renderItem={renderGroupItem}
        contentContainerStyle={styles.groupList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
  },
  groupList: {
    padding: 16,
  },
  groupContainer: {
    padding: 16,
    backgroundColor: darkTheme.cardColor,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: darkTheme.cardColor,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  allPostedContainer: {
    borderColor: 'orange',
    borderWidth: 3,
    shadowColor: 'orange',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  groupName: {
    color: darkTheme.textColor,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  groupScore: {
    color: 'lightblue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupCompletion: {
    color: darkTheme.textColor,
    fontSize: 14,
    marginBottom: 12,
  },
  membersList: {
    paddingTop: 8,
  },
  memberContainer: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
  },
  memberImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  memberPostImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 4,
  },
  iconButton: {
    backgroundColor: darkTheme.cardColor,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  scoreBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'lightblue',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  scoreText: {
    color: darkTheme.textColor,
    fontSize: 14,
    fontWeight: 'bold',
  },
  lockIconContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 15,
    padding: 4,
  },
});

export default ForYouFeed;