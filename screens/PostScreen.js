import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import darkTheme from '../themes/DarkTheme';

export default function PostScreen() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePost = () => {
    // Implement posting functionality here
    if (selectedOption) {
      console.log(`Posting to ${selectedOption}`);
    } else {
      alert('Please select an option');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Post Screen</Text>
      <TouchableOpacity style={styles.option} onPress={() => setSelectedOption('Public')}>
        <Text style={styles.optionText}>Public</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => setSelectedOption('Group')}>
        <Text style={styles.optionText}>Group</Text>
      </TouchableOpacity>
      <Button title="Post" onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkTheme.backgroundColor,
  },
  text: {
    color: darkTheme.textColor,
    fontSize: 24,
        marginBottom: 16,
  },
  option: {
    backgroundColor: darkTheme.cardColor,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  optionText: {
    color: darkTheme.textColor,
    fontSize: 18,
  },
});
