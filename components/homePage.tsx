import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const HomePage = () => {
    const route = useRoute();
    const { userData } = route.params ?? {};
    const navigation = useNavigation();


    const handleBagScreen = () => {
        navigation.navigate('BagScreen', { userData: userData });
    };
    const handleWarehouseScreen = () => {
        navigation.navigate('WarehouseScreen', { userData: userData });
    };
    const handleProfileScreen = () => {
        navigation.navigate('ProfileScreen', { userData: userData });
    };
    const handleMachineScreen = () => {
        navigation.navigate('MachinesHomePage', { userData: userData });
    };

    return (
        <View style={styles.container}>
            {/* Profile Button */}
            <TouchableOpacity style={styles.profileButton} onPress={handleProfileScreen}>
                {/* You can use an icon or an image for the profile */}
                <Text style={styles.profileButtonText}>Profile</Text>
            </TouchableOpacity>

            {/* Main Content */}
            <Text style={styles.Usersname}>Hello "{userData.name}"  !!!</Text>
            <Text style={styles.welcome}>Welcome to the app. From here you can manage the warehouse, bag, and machines.</Text>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.tab} onPress={handleBagScreen}>
                    <Text style={styles.tabText}>Bag</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={handleWarehouseScreen}>
                    <Text style={styles.tabText}>Warehouse</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={handleMachineScreen}>
                    <Text style={styles.tabText}>Machine</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    Usersname: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    welcome: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
    },
    profileButton: {
        position: 'absolute',
        top: 30,
        right: 18,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    profileButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default HomePage;
