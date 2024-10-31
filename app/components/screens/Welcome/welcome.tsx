import React, { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Box } from '@/gluestack/ui/box';
import { Text } from '@/gluestack/ui/text';
import { Button, ButtonText } from '@/gluestack/ui/button';
import { Animated, Dimensions, Easing } from 'react-native';
import { Heading } from '@/gluestack/ui/heading';
import i18n from '@/app/config/i18n';
import LottieView from 'lottie-react-native';
import { VStack } from '@/gluestack/ui/vstack';
import { Icon } from '@/gluestack/ui/icon';
import { ChevronRight } from 'lucide-react-native';

export default function WelcomePage() {
    const router = useRouter();
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const animation = useRef<LottieView>(null);
    const height = Dimensions.get('window').height;
    const handleGetStarted = () => {
        router.replace('/(tabs)');
    };

  
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1, 
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1, 
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Box className="flex w-full h-[95%] justify-center">
            <VStack className='flex w-full h-full justify-between items-center'>
                <Heading className='text-2xl mt-20'>
                    Oil<Heading className='text-2xl text-primary-500'>Reminder</Heading>
                </Heading>
                <Text className="text-3xl font-bold text-center mb-8 text-secondary-800 px-2">
                    {i18n.t('start_text')}
                </Text>

                <VStack className='w-full'>

                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                            
                            width: '100%',
                            height: height * 0.5,
                            
                        }}
                        source={require('@/assets/animations/car.json')}
                    />


                    <Animated.View className="w-full items-center" style={{ transform: [{ scale: scaleAnim }] }}>
                        <Button
                            className="bg-primary-500 w-[90%] h-16 rounded-full justify-center items-center"
                            onPress={handleGetStarted}
                        >
                            <ButtonText className="text-secondary-100 text-xl font-bold">
                                {i18n.t('start_button')}
                            </ButtonText>
                            <Icon as={ChevronRight} size='md' className='text-secondary-100' />
                        </Button>
                    </Animated.View>
                </VStack>
            </VStack>
        </Box>
    );
}
