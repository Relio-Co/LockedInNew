import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import darkTheme from '../themes/DarkTheme';

const sampleGroups = [
  { id: '1', name: 'Fitness Enthusiasts' },
  { id: '2', name: 'Healthy Eating' },
  // Add more sample groups
];

export default function PostScreen() {
  const [selectedGroup, setSelectedGroup] = useState(sampleGroups[0].id);
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.assets[0].uri);
    } else {
      setPhoto(null);
    }
  };

  const handlePost = () => {
    if (photo && caption) {
      console.log(`Posting to ${selectedGroup} with photo: ${photo} and caption: ${caption}`);
      // Add your post submission logic here
    } else {
      alert('Please take a photo and write a caption');
    }
  };

  useEffect(() => {
    if (hasPermission) {
      pickImage();
    }
  }, [hasPermission]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {photo ? (
            <>
              <Image source={{ uri: photo }} style={styles.preview} />
              <TextInput
                style={styles.input}
                placeholder="Write a caption..."
                placeholderTextColor={darkTheme.placeholderColor}
                value={caption}
                onChangeText={setCaption}
              />
              <View style={styles.groupSelector}>
                {sampleGroups.map(group => (
                  <TouchableOpacity
                    key={group.id}
                    style={styles.groupButton}
                    onPress={() => setSelectedGroup(group.id)}
                  >
                    <Text style={[styles.groupText, selectedGroup === group.id && styles.selectedGroupText]}>
                      {group.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Button title="Post" onPress={handlePost} color={darkTheme.accentColor} />
              <Button title="Retake Photo" onPress={pickImage} color={darkTheme.accentColor} />
            </>
          ) : (
            <Button title="Open Camera" onPress={pickImage} color={darkTheme.accentColor} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    backgroundColor: darkTheme.inputBackgroundColor,
    color: darkTheme.textColor,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  groupSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  groupButton: {
    backgroundColor: darkTheme.cardColor,
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  groupText: {
    color: darkTheme.textColor,
  },
  selectedGroupText: {
    color: darkTheme.accentColor,
  },
});
