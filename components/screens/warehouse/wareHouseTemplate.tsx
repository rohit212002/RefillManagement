import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const WareHouseTemplate = ({ item }) => {
    // console.log("wareHouseTemplate 7 ", item)
    const navigation = useNavigation();
    const handleClick = () => {
        navigation.navigate('InwareHouse', { data: item.item, userData: item.userData });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            <Icon name="building" size={30} color="black" />
            <Text style={styles.text}>{item.item}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 12,
    },
    text: {
        marginLeft: 10,
    },
});

export default WareHouseTemplate;
