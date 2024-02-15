// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
    const route = useRoute();
    const { userData } = route.params ?? {};
    const navigation = useNavigation();
    const handleLogOut = () => {
        navigation.navigate("Login")
    }

    return (
        <View style={styles.container}>
            <Image source={require('../onBoarding/images/profile.png')} style={styles.profileImage} />
            <Text style={styles.tags}>Name: <Text style={styles.tagValue}>{userData.name}</Text> </Text>
            <Text style={styles.tags}>Phone: <Text style={styles.tagValue}>{userData.phoneNumber}</Text> </Text>
            <Text style={styles.tags}>Email: <Text style={styles.tagValue}>{userData.email}</Text></Text>
            <TouchableOpacity onPress={handleLogOut}><Text style={styles.button}>Log Out</Text></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    tags: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tagValue: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    button: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#ff3b30',
        color: 'black',
        padding: 10,
        borderRadius: 5,
    },
});

export default ProfileScreen;
