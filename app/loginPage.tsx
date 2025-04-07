import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#A08967"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A08967"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <Pressable style={styles.loginButton} onPress={() => router.push('/home')}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
        
        <Pressable onPress={() => router.push('/signup')}>
          <Text style={styles.signupText}>Create a new account</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E7D1', // Beige Theme
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6B4F4F',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8D7765',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#FAF3E0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#6B4F4F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#C89F9C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    color: '#6B4F4F',
    textDecorationLine: 'underline',
  },
});
