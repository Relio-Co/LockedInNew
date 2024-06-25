import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import darkTheme from '../themes/DarkTheme';
import ExploreFeed from './ExploreFeed';
import ForYouFeed from './ForYouFeed';

export default function FeedScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Explore');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Explore')} style={[styles.tabButton, activeTab === 'Explore' && styles.activeTab]}>
          <Text style={styles.tabText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('For You')} style={[styles.tabButton, activeTab === 'For You' && styles.activeTab]}>
          <Text style={styles.tabText}>For You</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'Explore' ? <ExploreFeed navigation={navigation} /> : <ForYouFeed />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    paddingTop: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: darkTheme.accentColor,
  },
  tabText: {
    color: darkTheme.textColor,
    fontSize: 16,
  },
});
