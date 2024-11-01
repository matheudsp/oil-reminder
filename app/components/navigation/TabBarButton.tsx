import { StyleSheet, Pressable, GestureResponderEvent } from 'react-native'
import Animated from 'react-native-reanimated'
import React, { useEffect } from 'react'
import { icon } from '@/app/components/constants/icon'
import { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { IconKeys } from '@/app/components/constants/icon'
import i18n from '@/app/config/i18n'
const TabBarButton = ({
    onPress,
    onLongPress,
    isFocused,
    routeName,
    color,
    label
}: {
    onPress: (event: GestureResponderEvent) => void,
    onLongPress: (event: GestureResponderEvent) => void,
    isFocused: boolean,
    routeName: string,
    color: string,
    label: any
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
                {icon[routeName as IconKeys]({
                    color: isFocused ? '#FFF' : '#222'
                })}
            </Animated.View>
            <Animated.Text
                className="text-xs font-bold"
                style={[{ color: isFocused ? 'rgb(33 150 243)' : '#222' }, animatedTextStyle]}>
                {label === 'Vehicles' ? (i18n.t('vehicles')) : (i18n.t('about'))}
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
