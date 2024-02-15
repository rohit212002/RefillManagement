import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Text } from 'react-native';
import OnBoardingItem from './onBoarding/OnBoardingItem';
import slides from './onBoarding/slides';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const OnBoarding = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [NextButton, setNextButton] = useState("Next");
    const [SkipButton, setSkipButton] = useState("Skip");
    const [PrevButton, setPrevButton] = useState("");
    const flatListRef = useRef(null);
    const navigation = useNavigation();

    const handleScroll = (event) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentSlide(slideIndex);
        // console.log(slideIndex)
        if (slideIndex == 0) {
            setPrevButton("");
        }
        else if (slideIndex == 5) {
            setSkipButton("Get Started");
            setNextButton("");
            setPrevButton("Prev");
        }
        else {
            setSkipButton("Skip");
            setPrevButton("Prev");
            setNextButton("Next");
        }
    };

    const handleSkip = () => {
        navigation.navigate('Login');
    };

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentSlide + 1 });
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            flatListRef.current.scrollToIndex({ index: currentSlide - 1 });
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={({ item }) => <OnBoardingItem item={item} />}
                keyExtractor={(item) => item.title}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
            />
            <View style={styles.dotsContainer}>
                {slides.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dot, currentSlide === index && styles.activeDot]}
                    />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePrev}>
                    <Text style={styles.buttonText}>{PrevButton}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipText}>{SkipButton}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>{NextButton}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#000',
    },
    skipButton: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    skipText: {
        fontSize: 16,
        color: '#ff9933',
        // textDecorationLine: 'underline',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default OnBoarding;
