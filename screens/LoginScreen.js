import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase';
import darkTheme from '../themes/DarkTheme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigation.navigate('Main');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={darkTheme.textColor}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={darkTheme.textColor}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={handleAuth} color={darkTheme.accentColor} />
      <Button
        title={isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
        onPress={() => setIsSignUp(!isSignUp)}
        color={darkTheme.accentColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: darkTheme.backgroundColor,
  },
  input: {
    height: 40,
    borderColor: darkTheme.borderColor,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: darkTheme.textColor,
    backgroundColor: darkTheme.cardColor,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});
