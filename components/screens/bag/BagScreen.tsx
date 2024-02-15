import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Products from './products';
const BagPage = () => {
    const route = useRoute();
    const { userData } = route.params;
    let [bagItems, setBagItems] = useState([]);

    useEffect(() => {
        const fetchBagItems = async () => {
            try {
                const firestore = getFirestore();
                const bagRef = collection(firestore, 'users', userData.email, 'bag');
                const querySnapshot = await getDocs(bagRef);
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // console.log(items);
                setBagItems(items.filter(item => item.countInBag !== 0));
            } catch (error) {
                console.error('Error fetching bag items:', error);
            }
        };

        fetchBagItems();
    }, [userData.email]);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Bag</Text>
            {(bagItems.length == 0) ?
                <Text style={styles.emptyText}>
                    <Icon name="production-quantity-limits" size={30} color="black" />
                    Your Bag Is Empty</Text> :
                <FlatList
                    data={bagItems}
                    renderItem={({ item }) => <Products productDetails={{ item, userData }} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    emptyText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 250,
        fontSize: 30
    },
    item: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
});

export default BagPage;
