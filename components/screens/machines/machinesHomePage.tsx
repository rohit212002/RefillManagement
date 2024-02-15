import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Modal, FlatList } from 'react-native';
import MachinesTemplate from './MachinesTemplate';
import Loading from "../../Loading";
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { getFirestore, setDoc, doc, getDocs, collection, } from 'firebase/firestore';
import app from '../../../firebaseConfig';

const MachinesScreen = () => {
    const route = useRoute();
    const { userData } = route.params ?? {};
    // console.log("wareHouseScreen 12 ", userData);
    const navigation = useNavigation(); // Initialize navigation object using useNavigation hook
    const [machines, setMachines] = useState([]);
    const [newMachine, setNewMachine] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        const fetchMachines = async () => {
            try {
                setIsLoading(true);

                const firestore = getFirestore(app);
                const machineCollection = collection(firestore, 'machines');
                const machineSnapshot = await getDocs(machineCollection);
                const machineData = machineSnapshot.docs.map(doc => doc.data().name);
                setMachines(machineData);
            }
            catch {
                console.log("Error in Fetching machines.")
            } finally {
                setIsLoading(false);
            }
        };
        fetchMachines();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    const addNewMachine = () => {
        setModalVisible(true);
    }

    const addMachine = async () => {
        const firestore = getFirestore(app);
        if (newMachine.trim() !== '') {
            const userRef = doc(firestore, 'machines', newMachine);
            try {
                await setDoc(userRef, {
                    name: newMachine
                });
                // Refresh the warehouses after adding a new one
                const updatedMachines = [...machines, newMachine];
                setMachines(updatedMachines);
            } catch (error) {
                console.error('Error signing up: ', error);
            } finally {
                setIsLoading(false);
            }
            setNewMachine(''); // Clear input field after adding warehouse
        }
        setModalVisible(false);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={styles.container}>

                <Text style={styles.heading}>Machines Screen</Text>

                <TouchableOpacity style={styles.addButtonOutside} onPress={addNewMachine}>
                    <Text style={styles.buttonText}>Add New Machine</Text>
                </TouchableOpacity>
                <View style={styles.warehouseList}>
                    <FlatList
                        data={machines}
                        renderItem={({ item, index }) => <MachinesTemplate item={{ item, userData }} index={index} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>

                        <View style={styles.modalView}>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={newMachine}
                                    onChangeText={setNewMachine}
                                    placeholder="Enter Machine name"
                                    onSubmitEditing={addMachine}
                                />
                                <TouchableOpacity style={styles.addButton} onPress={addMachine}>
                                    <Text style={styles.buttonText}>Add Machine</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                <Loading isLoading={isLoading} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Background color
        position: 'relative',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50,
        position: 'absolute',
        top: 250,
        left: 25,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    warehouseList: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 50,
        marginBottom: 4,
    },
    addButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
    },
    addButtonOutside: {
        marginTop: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MachinesScreen;
