// In PostScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, TextInput, Picker, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import darkTheme from '../themes/DarkTheme';

export default function PostScreen({ navigation }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    fetchSubscribedGroups();
  }, []);

  const fetchSubscribedGroups = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      const response = await axios.get('https://server.golockedin.com/groups/subscribed', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching subscribed groups:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handlePost = async () => {
    if (photo && caption) {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('isPublic', isPublic);
        if (!isPublic && selectedGroup) {
          formData.append('groupId', selectedGroup);
        }
        formData.append('image', {
          uri: photo,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const postResponse = await axios.post('https://server.golockedin.com/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (postResponse.status === 201) {
          alert('Post submitted successfully!');
          setPhoto(null);
          setCaption('');
          navigation.goBack();
        } else {
          alert('Failed to submit post');
        }
      } catch (error) {
        console.error('Error posting:', error);
        alert(`Error posting. Please try again. ${error.message}`);
      }
    } else {
      alert('Please take a photo and write a caption');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
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
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>Post Publicly</Text>
                <Switch
                  value={isPublic}
                  onValueChange={(value) => setIsPublic(value)}
                />
              </View>
              {!isPublic && (
                <Picker
                  selectedValue={selectedGroup}
                  onValueChange={(itemValue) => setSelectedGroup(itemValue)}
                >
                  {groups.map((group) => (
                    <Picker.Item key={group.group_id} label={group.name} value={group.group_id} />
                  ))}
                </Picker>
              )}
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
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleText: {
    color: darkTheme.textColor,
    marginRight: 8,
  },
});
