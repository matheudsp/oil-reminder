import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    return (
        <View style={[styles.backdrop, style]}>
            {/* Você pode adicionar uma animação aqui se desejar */}
        </View>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'black',
        opacity: 0.7, // 70% de opacidade
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default CustomBackdrop;
