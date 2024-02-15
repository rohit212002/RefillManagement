import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, setDoc, doc, collection, addDoc, getDocs } from 'firebase/firestore';
import Products from './products';

export default function InwareHouse() {
    const route = useRoute();
    const { data, userData } = route.params;
    // console.log("inwareHouse 10 ", userData);
    // const userId = userId;
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const firestore = getFirestore();
                const warehouseRef = doc(firestore, 'warehouses', data);
                const storageRef = collection(warehouseRef, 'storage');
                const querySnapshot = await getDocs(storageRef);

                const productsData = querySnapshot.docs.map(doc => doc.data().name);
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);



    // Function to add a product to the warehouse's storage
    const addProductToStorage = async (productName) => {
        const firestore = getFirestore();
        const warehouseRef = doc(firestore, 'warehouses', data); // Reference to the warehouse
        const storageRef = collection(warehouseRef, 'storage'); // Reference to the storage collection of the warehouse
        try {
            await setDoc(doc(storageRef, productName), { name: productName, count: 0 }); // Add the product to the storage with count 0
        } catch (error) {
            console.error('Error adding product to storage:', error);
        }
    };



    const addNewProduct = () => {
        setModalVisible(true);
    };
    const addProduct = () => {
        if (newProduct.trim() !== '') {
            setProducts([...products, newProduct]);
            addProductToStorage(newProduct); // Add the new product to the warehouse's storage
            setNewProduct(''); // Clear input field after adding product
        }
        setModalVisible(false);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>{data}</Text>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.addButtonOutside} onPress={addNewProduct}>
                    <Text style={styles.buttonText}>Add New Product</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                renderItem={({ item }) => <Products productDetails={{ item, data, userData }} />}
                keyExtractor={(item, index) => index.toString()}
            />

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

                        <TextInput
                            style={styles.input}
                            value={newProduct}
                            onChangeText={setNewProduct}
                            placeholder="Enter Product name"
                            onSubmitEditing={addProduct}
                        />
                        <TouchableOpacity style={styles.addButton} onPress={addProduct}>
                            <Text style={styles.buttonText}>Add Product</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0', // Background color
        paddingTop: 30, // Padding at the top
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
        paddingBottom: 10, // Padding at the bottom
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
        left: 50,
    },
    header: {
        marginBottom: 10,
        borderBottomWidth: 1, // Bottom border
        fontSize: 24, // Font size
        fontWeight: 'bold', // Bold font weight
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
