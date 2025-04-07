import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Signup = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create a New Account</Text>

            <TextInput 
                style={styles.input} 
                placeholder="Full Name" 
                value={fullName} 
                onChangeText={setFullName}
            />
            <TextInput 
                style={styles.input} 
                placeholder="Email Address" 
                keyboardType="email-address"
                value={email} 
                onChangeText={setEmail}
            />
            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword}
            />
            <TextInput 
                style={styles.input} 
                placeholder="Confirm Password" 
                secureTextEntry 
                value={confirmPassword} 
                onChangeText={setConfirmPassword}
            />

            <Pressable style={styles.signupButton} onPress={() => router.push('/loginPage')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

            <Pressable onPress={() => router.push('/loginPage')}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5E7D1',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    signupButton: {
        backgroundColor: '#D4A373',
        padding: 15,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 15,
        fontSize: 16,
        color: '#8B5E3C',
        textDecorationLine: 'underline',
    }
});

export default Signup;
