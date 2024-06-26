import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import darkTheme from '../themes/DarkTheme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  AsyncStorage.clear();
  useEffect(() => {
    checkExistingToken();
  }, []);

  const checkExistingToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        validateToken(token);
      }
    } catch (error) {
      console.error('Error checking existing token:', error);
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await fetch('https://server.golockedin.com/user/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigation.replace('Main');
      } else {
        await AsyncStorage.removeItem('userToken');
      }
    } catch (error) {
      console.error('Error validating token:', error);
      await AsyncStorage.removeItem('userToken');
    }
  };

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('userToken', token);
      validateToken(token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.appName}>LockIn</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={24} color={darkTheme.textColor} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor={darkTheme.placeholderColor} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color={darkTheme.textColor} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Password" placeholderTextColor={darkTheme.placeholderColor} value={password} secureTextEntry onChangeText={setPassword} />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={darkTheme.buttonTextColor} />
              ) : (
                <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={styles.switchText}>
                {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
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
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkTheme.textColor,
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkTheme.inputBackgroundColor,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: darkTheme.textColor,
    fontSize: 16,
  },
  errorText: {
    color: darkTheme.errorColor,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: darkTheme.buttonColor,
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: darkTheme.buttonTextColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: darkTheme.textColor,
    textAlign: 'center',
    marginTop: 20,
  },
});
