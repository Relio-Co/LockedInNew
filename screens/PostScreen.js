import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import darkTheme from '../themes/DarkTheme';

const sampleGroups = [
  { id: '1', name: 'Fitness Enthusiasts' },
  { id: '2', name: 'Healthy Eating' },
  // Add more sample groups
];

export default function PostScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(sampleGroups[0].id);
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handlePost = () => {
    if (photo) {
      console.log(`Posting to ${selectedGroup} with photo: ${photo.uri}`);
    } else {
      alert('Please take a photo');
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <Image source={{ uri: photo.uri }} style={styles.preview} />
      ) : (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={ref => setCameraRef(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <View style={styles.groupSelector}>
        {sampleGroups.map(group => (
          <TouchableOpacity key={group.id} style={styles.groupButton} onPress={() => setSelectedGroup(group.id)}>
            <Text style={[styles.groupText, selectedGroup === group.id && styles.selectedGroupText]}>{group.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Post" onPress={handlePost} color={darkTheme.accentColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  preview: {
    flex: 1,
    alignSelf: 'stretch',
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
