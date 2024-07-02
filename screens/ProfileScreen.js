import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, Switch, Alert, Button } from 'react-native';
import axios from 'axios';
import darkTheme from '../themes/DarkTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [privateAccount, setPrivateAccount] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [profilePicture, setProfilePicture] = useState('');
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        if (token) {
          const response = await axios.get(`${apiUrl}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const user = response.data;
          setUserData(user);
          setUsername(user.username);
          setName(user.name);
          setPrivateAccount(user.private_account);
          setEmailNotifications(user.email_notifications);
          setPushNotifications(user.push_notifications);
          setProfilePicture(user.profile_picture);
        } else {
          // Handle the case where token is not available
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [apiUrl, navigation]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const saveUserSettings = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      const formData = new FormData();
      formData.append('username', username);
      formData.append('name', name);
      formData.append('private_account', privateAccount);
      formData.append('email_notifications', emailNotifications);
      formData.append('push_notifications', pushNotifications);
      if (profilePicture) {
        formData.append('profile_picture', {
          uri: profilePicture,
          type: 'image/jpeg',
          name: 'profile_picture.jpg',
        });
      }
      await axios.put(`${apiUrl}/user/settings`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsEditingUsername(false);
      setIsEditingName(false);
    } catch (error) {
      console.error('Error updating user settings:', error);
    }
  };
  

  const logout = async () => {
    await AsyncStorage.removeItem('jwt_token');
    navigation.replace('Login');
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: deleteAccount },
      ],
      { cancelable: true }
    );
  };

  const deleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      await axios.delete(`${apiUrl}/user/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await AsyncStorage.removeItem('jwt_token');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  

  const renderPostItem = ({ item }) => (
    <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
  );

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationContainer}
      onPress={() => {
        if (item.type === 'Group' && item.groupId) {
          navigation.navigate('GroupFeed', { groupId: item.groupId });
        }
      }}
    >
      <Text style={styles.notificationText}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profilePicture || 'https://via.placeholder.com/100' }} style={styles.profilePicture} />
          <Icon name="edit" size={20} color={darkTheme.textColor} style={styles.editIcon} />
        </TouchableOpacity>
        <View style={styles.editableField}>
          {isEditingUsername ? (
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              onBlur={saveUserSettings}
              autoFocus
            />
          ) : (
            <TouchableOpacity onLongPress={() => setIsEditingUsername(true)}>
              <Text style={styles.username}>{username}</Text>
              <Icon name="edit" size={20} color={darkTheme.textColor} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.editableField}>
          {isEditingName ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              onBlur={saveUserSettings}
              autoFocus
            />
          ) : (
            <TouchableOpacity onLongPress={() => setIsEditingName(true)}>
              <Text style={styles.name}>{name || 'No Name'}</Text>
              <Icon name="edit" size={20} color={darkTheme.textColor} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.score}>Score: {userData.score || 0}</Text>
        <Text style={styles.joinDate}>Joined: {new Date(userData.createdAt).toLocaleDateString()}</Text>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.settingsField}>
          <Text style={styles.settingsLabel}>Private Account</Text>
          <Switch
            value={privateAccount}
            onValueChange={(value) => setPrivateAccount(value)}
          />
        </View>
        <View style={styles.settingsField}>
          <Text style={styles.settingsLabel}>Email Notifications</Text>
          <Switch
            value={emailNotifications}
            onValueChange={(value) => setEmailNotifications(value)}
          />
        </View>
        <View style={styles.settingsField}>
          <Text style={styles.settingsLabel}>Push Notifications</Text>
          <Switch
            value={pushNotifications}
            onValueChange={(value) => setPushNotifications(value)}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={saveUserSettings}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDeleteAccount}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <SwipeListView
        data={notifications}
        renderItem={renderNotification}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteNotification(data.item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
        disableRightSwipe
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  editIcon: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 4,
  },
  editableField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: darkTheme.textColor,
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    color: darkTheme.textColor,
    marginRight: 8,
  },
  score: {
    fontSize: 16,
    color: darkTheme.textColor,
  },
  joinDate: {
    fontSize: 14,
    color: darkTheme.textColor,
  },
  settingsContainer: {
    marginBottom: 24,
  },
  settingsField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.dividerColor,
  },
  settingsLabel: {
    fontSize: 16,
    color: darkTheme.textColor,
  },
  saveButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: darkTheme.primaryColor,
    borderRadius: 4,
  },
  saveButtonText: {
    color: darkTheme.textColor,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: darkTheme.secondaryColor,
    borderRadius: 4,
  },
  logoutButtonText: {
    color: darkTheme.textColor,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  deleteButtonText: {
    color: darkTheme.textColor,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  notificationContainer: {
    padding: 16,
    backgroundColor: darkTheme.cardBackgroundColor,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.dividerColor,
  },
  notificationText: {
    color: darkTheme.textColor,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
});

export default ProfileScreen;
