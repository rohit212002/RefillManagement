import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, doc, updateDoc, collection, getDocs, getDoc } from 'firebase/firestore';
import Loading from '../../Loading';

export default function Products(props) {
    const productName = props.productDetails.item.id;
    let countInBag = props.productDetails.item.countInBag;
    const warehouseName = props.productDetails.item.fromWhichWarehouse;
    const userData = props.productDetails.userData;
    if (!countInBag) {
        countInBag = 0;
    }
    const [count, setCount] = useState(countInBag);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchBagItems = async () => {
            try {
                const firestore = getFirestore();
                const userRef = doc(firestore, 'users', userData.email);
                const bagsCollectionRef = collection(userRef, 'bag');

                const querySnapshot = await getDocs(bagsCollectionRef);
            } catch (error) {
                console.error('Error fetching bag items:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBagItems();
    }, [count]);


    const updateCountInBagDatabase = async () => {
        try {
            const firestore = getFirestore();
            const userRef = doc(firestore, 'users', userData.email);
            const bagRef = collection(userRef, 'bag');
            const productRef = doc(bagRef, productName);
            await updateDoc(productRef, { countInBag: count - 1 });
            console.log('Product count in bag updated successfully.');
        } catch (error) {
            console.error('Error updating count in database:', error);
        }
    };
    const addToWareHouseDatabase = async () => {
        try {
            const firestore = getFirestore();
            const warehouseRef = doc(firestore, 'warehouses', warehouseName);
            const storageRef = collection(warehouseRef, 'storage');
            const productRef = doc(storageRef, productName);

            const productSnapshot = await getDoc(productRef);
            const productData = productSnapshot.data();
            if (productData) {
                const currentCount = (productData.count + 1) || 0;

                await updateDoc(productRef, { count: currentCount });

                console.log('Product is added to the warehouse successfully.');
            } else {
                console.error('Product does not exist in the warehouse.');
            }
        } catch (error) {
            console.error('Error updating count in warehouse database:', error);
        }
    };



    const decrementCount = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            updateCountInBagDatabase();
            addToWareHouseDatabase();
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
                <Text style={styles.input}>{count}</Text>

            </View>
            <Text style={styles.fromWarehouse}>{warehouseName}</Text>
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
        flexDirection: 'row',
        position: 'relative',
    },
    fromWarehouse: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 10,
        marginBottom: 10,
        fontSize: 12,
        color: '#666',
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
        paddingHorizontal: 10,
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
