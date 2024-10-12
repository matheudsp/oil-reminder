import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

const AnimatedRadioButton = ({ isSelected, onPress }:any) => {
  const animationValue = new Animated.Value(isSelected ? 1 : 0);

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isSelected ? 1 : 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [isSelected]);

  const animatedStyle = {
    transform: [
      {
        scale: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
  };

  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <Animated.View style={[styles.radioCircle, animatedStyle]}>
        {isSelected && <View style={styles.selectedCircle} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgb(33 150 243)',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  selectedCircle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgb(33 150 243)',
  },

});

export default AnimatedRadioButton;
