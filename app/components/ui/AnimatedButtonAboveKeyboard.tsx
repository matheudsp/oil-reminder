import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableOpacity, Platform } from 'react-native';
import { Box } from '@/gluestack/ui/box';
import { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import Animated, { Easing } from 'react-native-reanimated';



const AnimatedButtonAboveKeyboard = ({ isKeyboardVisible, keyboardHeight, focusedField, odometerRef, oilChangeIntervalRef, observationRef, handleNext }:any) => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    const buttonY = Platform.OS === 'ios' ? keyboardHeight + 48 : keyboardHeight * 0.15;
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    useEffect(() => {
        if (isKeyboardVisible) {
            scale.value = withTiming(1, { duration: 300 });
            opacity.value = withTiming(1, { duration: 300 });
        } else {
            scale.value = withTiming(0, { duration: 300 });
            opacity.value = withTiming(0, { duration: 300 });
        }
    }, [isKeyboardVisible]);

    const handlePressIn = () => {
        scale.value = withSpring(0.7);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const handlePress = () => {
        if (odometerRef.current?.isFocused()) {
            handleNext(oilChangeIntervalRef);
        } else if (oilChangeIntervalRef.current?.isFocused()) {
            handleNext(observationRef);
        } else if (observationRef.current?.isFocused()) {
            Keyboard.dismiss();
        }
    };

    return (
        <Box style={{
            position: 'absolute',
            bottom: buttonY,
            right: 5,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Animated.View className="bg-primary-400" style={[styles.view, animatedStyle]}>
                <TouchableOpacity
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={handlePress}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>{observationRef.current?.isFocused() ? 'Done' : 'Next'}</Text>
                </TouchableOpacity>
            </Animated.View>
        </Box>
    );
};

const styles = StyleSheet.create({
    view: {
        
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 24,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    button: {
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AnimatedButtonAboveKeyboard;
