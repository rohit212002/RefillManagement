import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, doc, updateDoc, collection, getDoc, setDoc } from 'firebase/firestore';
import Loading from '../../Loading';


export default function Products(props) {
    const { data: wareHouseName, item: productName, userData: userData } = props.productDetails;
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    // console.log("product 10 ", userData)
    useEffect(() => {
        const getCountFromDatabase = async () => {
            try {
                const firestore = getFirestore();
                const warehouseRef = doc(firestore, 'warehouses', wareHouseName);
                const storageRef = collection(warehouseRef, 'storage');
                const productRef = doc(storageRef, productName);

                const productSnapshot = await getDoc(productRef);
                const productData = productSnapshot.data();
                if (productData && productData.count !== undefined) {
                    setCount(productData.count);
                }
            } catch (error) {
                console.error('Error getting count from database:', error);
            } finally {
                setIsLoading(false);
            }
        };
        getCountFromDatabase();
    }, [wareHouseName, productName]);

    const updateCountInDatabase = async (newCount) => {
        try {
            const firestore = getFirestore();
            const warehouseRef = doc(firestore, 'warehouses', wareHouseName);
            const storageRef = collection(warehouseRef, 'storage');
            const productRef = doc(storageRef, productName);

            await updateDoc(productRef, { count: newCount });
            console.log('Count updated in the database successfully.');
        } catch (error) {
            console.error('Error updating count in database:', error);
        }
    };
    const [countInBag, setCountInBag] = useState(1);
    const addToUserBag = async () => {
        try {
            const firestore = getFirestore();
            const userRef = doc(firestore, 'users', userData.email);
            const userBagRef = collection(userRef, 'bag');

            const productData = {
                countInBag: countInBag,
                fromWhichWarehouse: wareHouseName
            };

            await setDoc(doc(userBagRef, productName), productData);
            console.log('Product added to user bag.');
        } catch (error) {
            console.error('Error adding product to user bag:', error);
        }
    };


    const incrementCount = () => {
        const newCount = count + 1;
        setCount(newCount);
        updateCountInDatabase(newCount);
    };

    const decrementCount = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            updateCountInDatabase(newCount);
            setCountInBag(countInBag + 1);
            addToUserBag();
        }
    };

    return (
        <View style={styles.container}>
            <Loading isLoading={isLoading} />
            <Icon name="ac-unit" size={30} color="black" />
            <View style={styles.header}>
                <Text style={styles.productName}>{productName}</Text>
            </View>
            <View style={styles.content}>
                <TouchableOpacity style={styles.button} onPress={decrementCount}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={count.toString()}
                    onChangeText={(text) => setCount(parseInt(text) || 0)}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.button} onPress={incrementCount}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 50,
        display: 'flex',
        flexDirection: 'row'
    },
    header: {
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        textAlign: 'center',
        fontSize: 13,
        height: 40,
        minWidth: 50,
        flex: 1,
        marginHorizontal: 1,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        height: 40,
        minWidth: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
