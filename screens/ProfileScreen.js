import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
import axios from 'axios';
import darkTheme from '../themes/DarkTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        const response = await axios.get(`${apiUrl}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data[0];
        setUserData(user);
        setUsername(user.username);
        setName(user.name);
        setPrivateAccount(user.private_account);
        setEmailNotifications(user.email_notifications);
        setPushNotifications(user.push_notifications);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        const response = await axios.get(`${apiUrl}/user/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        const response = await axios.get(`${apiUrl}/user/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchUserData();
    fetchUserPosts();
    fetchNotifications();
  }, [apiUrl]);

  const saveUserSettings = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      await axios.put(
        `${apiUrl}/user/settings`,
        {
          username,
          name,
          private_account: privateAccount,
          email_notifications: emailNotifications,
          push_notifications: pushNotifications,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
        <Image source={{ uri: userData.profile_picture || 'https://via.placeholder.com/100' }} style={styles.profilePicture} />
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
      />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPostItem}
        numColumns={3}
        style={styles.postsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    paddingTop: 50,
  },
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.borderColor,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  editableField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: darkTheme.textColor,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.accentColor,
    marginBottom: 8,
    marginRight: 8,
  },
  username: {
    color: darkTheme.textColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    color: darkTheme.textColor,
    fontSize: 16,
  },
  score: {
    color: darkTheme.textColor,
    fontSize: 14,
  },
  joinDate: {
    color: darkTheme.textColor,
    fontSize: 14,
  },
  settingsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.borderColor,
  },
  settingsField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  settingsLabel: {
    color: darkTheme.textColor,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: darkTheme.accentColor,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: darkTheme.buttonTextColor,
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: darkTheme.buttonColor,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: darkTheme.buttonTextColor,
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: darkTheme.errorColor,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: darkTheme.buttonTextColor,
    fontSize: 16,
  },
  postsContainer: {
    padding: 16,
  },
  postImage: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.5%',
  },
  notificationContainer: {
    backgroundColor: darkTheme.cardColor,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.borderColor,
  },
  notificationText: {
    color: darkTheme.textColor,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: darkTheme.errorColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  deleteButton: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: darkTheme.textColor,
  },
});

export default ProfileScreen;
