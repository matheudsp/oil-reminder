import { StyleSheet, Pressable } from 'react-native'
import Animated from 'react-native-reanimated'
import React, { useEffect } from 'react'
import { icon } from '@/app/components/constants/icon'
import { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const TabBarButton = ({
    onPress,
    onLongPress,
    isFocused,
    routeName,
    color,
    label
}: {
    onPress: Function,
    onLongPress: Function,
    isFocused: boolean,
    routeName: string,
    color: string,
    label: string
}
) => {
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 });
    }, [scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])

        const top = interpolate(scale.value, [0, 1], [0, 9]);


        return {
            transform: [{
                scale: scaleValue
            }],
            top
        }
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0]);

        return { opacity }
    })

    return (
        <Pressable

            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
        >
            <Animated.View style={animatedIconStyle}>
                {icon[routeName]({
                    color: isFocused ? '#FFF' : '#222'
                })}
            </Animated.View>
            <Animated.Text
                style={[{ color: isFocused ? '#673ab7' : '#222' }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    )
}

export default TabBarButton

const styles = StyleSheet.create({
    tabbarItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})
