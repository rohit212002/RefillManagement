import React from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';

export default function OnBoardingItem({ item }) {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <View style={styles.card}>

                <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />
                <View style={styles.textContainer}>
                    <Text style={styles.firstLetter}>{item.firstLetter}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    firstLetter: {
        fontSize: 32,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '800',
        color: 'red'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,


    },
    image: {
        flex: 0.7,
        justifyContent: 'center'
    },
    textContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '800',
        color: '#493d8a'
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '300',
        color: '#62656b',
    },
});
