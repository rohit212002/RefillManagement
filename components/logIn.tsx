import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebaseConfig';
import Loading from './Loading';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            // Prevent default behavior of leaving the screen
            e.preventDefault();
        });

        // Cleanup the event listener
        return unsubscribe;
    }, [navigation]);

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Fill all fields')
            return
        }
        setIsLoading(true);
        const firestore = getFirestore(app);
        const userRef = doc(firestore, 'users', email);

        try {
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                if (userData.password === password) {
                    navigation.navigate('HomeScreen', { userData: userData });
                } else {
                    alert('Incorrect password');
                }
            } else {
                alert('User not found');
            }
        } catch (error) {
            console.error('Error logging in: ', error);
        } finally {
            setEmail("");
            setPassword("");
            setIsLoading(false);
        }
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome To Go-Grab Machine Management App</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSignUp} onPress={handleSignUp}>
                <Text style={[styles.buttonText, { color: 'blue' }]}>Create a new account</Text>
            </TouchableOpacity>
            <Loading isLoading={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonSignUp: {
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
});

export default LoginScreen;
