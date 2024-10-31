import { Box } from '@/gluestack/ui/box';
import { Pressable } from '@/gluestack/ui/pressable';
import { Text } from '@/gluestack/ui/text'
import { Keyboard, ScrollView, TextInput, View } from 'react-native';
import { FormControl } from '@/gluestack/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/gluestack/ui/input';
import { VStack } from '@/gluestack/ui/vstack';
import { ArrowDownUp, Bike, Camera, Car, CarFront, Check, CircleAlert, CircleX, Droplets, Focus, Images, Info, Truck } from 'lucide-react-native';
import { Icon } from '@/gluestack/ui/icon';
import { HStack } from '@/gluestack/ui/hstack';
import { Center } from '@/gluestack/ui/center';
import React, { Ref, useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ImageBackground } from 'react-native';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetIcon, ActionsheetItem, ActionsheetItemText } from '@/gluestack/ui/actionsheet';
import { Button, ButtonIcon, ButtonText } from '@/gluestack/ui/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useVehicleContext } from '../../contexts/VehicleContext';
import { useToast } from '@/gluestack/ui/toast';
import { Spinner } from '@/gluestack/ui/spinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboard } from '@react-native-community/hooks';
import CustomToast from '../../ui/CustomToast';
import HeaderWithArrowBack from '../../ui/HeaderWithArrowBack';
import AnimatedKeyboardButton from '../../ui/AnimatedButtonAboveKeyboard';
import AnimatedButtonAboveKeyboard from '../../ui/AnimatedButtonAboveKeyboard';
import i18n from '@/app/config/i18n';


const vehicleTypes = [
    {
        type: "Car",
        Icon: Car
    },
    {
        type: "Motorcycle",
        Icon: Bike
    },
    {
        type: "Truck",
        Icon: Truck
    }
]
export default function AddPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [modalImageVisible, setModalImageVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [vehicleType, setVehicleType] = useState<string>('Car');
    const [vehicleName, setVehicleName] = useState<string>('');
    const [odometerReading, setOdometerReading] = useState<string>('');
    const [oilChangeInterval, setOilChangeInterval] = useState<string>('');
    const [vehicleObservation, setVehicleObservation] = useState<string>('');
    const odometerRef = useRef<TextInput>(null);
    const oilChangeIntervalRef = useRef<TextInput>(null);
    const observationRef = useRef<TextInput>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    

    const router = useRouter();
    const toast = useToast()

    // Monitoramento do teclado
    const keyboard = useKeyboard();
    const isKeyboardVisible = keyboard.keyboardShown; 

    // Função para controlar o foco entre inputs
    const handleNext = (nextRef: any) => {
        if (nextRef && nextRef.current) {
            nextRef.current.focus();
        }
    };

    const { loadVehicles } = useVehicleContext();
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                toast.show({
                    placement: "top",
                    render: ({ id }) => {
                        const toastId = "toast-" + id
                        return (
                            CustomToast({
                                toastId: toastId,
                                icon: CircleAlert,
                                message: (i18n.t('alert_camera_permission'))
                            })
                        )
                    }
                })
            }

            const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (mediaStatus.status !== 'granted') {
                toast.show({
                    placement: "top",
                    render: ({ id }) => {
                        const toastId = "toast-" + id
                        return (
                            CustomToast({
                                toastId: toastId,
                                icon: CircleAlert,
                                message: (i18n.t('alert_gallery_permission'))
                            })
                        )
                    }
                })
            }
        })();
    }, []);



    const pickImage = async (fromCamera: boolean) => {
        try {
            let result;
            if (fromCamera) {
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 1,
                });
            } else {
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 1,
                });
            }

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
                setModalImageVisible(false);
            }
        } catch (error) {
            console.error("Erro ao abrir a câmera ou galeria: ", error);
        }
    };

    const getNextVehicleId = async () => {
        const currentId = await AsyncStorage.getItem('@vehicleId');
        const nextId = currentId ? parseInt(currentId, 10) + 1 : 0; // Incrementa o ID ou começa de 0
        await AsyncStorage.setItem('@vehicleId', nextId.toString());
        return nextId;
    };

    const handleAddVehicle = async () => {
        if (!vehicleName || !odometerReading || !oilChangeInterval) {
            toast.show({
                placement: "top",
                render: ({ id }) => {
                    const toastId = "toast-" + id
                    return (
                        CustomToast({
                            toastId: toastId,
                            icon: CircleAlert,
                            message: (i18n.t('alert_empty_field'))
                        })
                    )
                }
            })

            return;
        }

        setIsLoading(true)

        const id = await getNextVehicleId();

        const vehicleData = {
            id: id,
            name: vehicleName,
            type: vehicleType,
            observation: vehicleObservation,
            odometer: odometerReading,
            oilInterval: oilChangeInterval,
            image: selectedImage
        };

        try {
            const storedVehicles = await AsyncStorage.getItem('@vehicles');
            const vehiclesArray = storedVehicles ? JSON.parse(storedVehicles) : [];
            vehiclesArray.push(vehicleData);

            await AsyncStorage.setItem('@vehicles', JSON.stringify(vehiclesArray));
            await loadVehicles();
            router.push('/(tabs)/')
            
            toast.show({
                placement: "top",
                render: ({ id }) => {
                    const toastId = "toast-" + id
                    return (
                        CustomToast({
                            toastId: toastId,
                            icon: Check,
                            message: (i18n.t('alert_vehicle_added'))
                        })
                    )
                }
            })

        } catch (error) {
            console.error('Failed to save data', error);
            toast.show({
                placement: "top",
                render: ({ id }) => {
                    const toastId = "toast-" + id
                    return (
                        CustomToast({
                            toastId: toastId,
                            icon: CircleAlert,
                            message: (i18n.t('alert_vehicle_failed'))
                        })
                    )
                }
            })
        } finally {
            setIsLoading(false)
        }

        setVehicleName('')
        setVehicleType('Car')
        setOdometerReading('')
        setOilChangeInterval('')
        setVehicleObservation('')
        setSelectedImage(undefined)

        

    };

    return (
        <>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraHeight={100}
                extraScrollHeight={100}
                keyboardOpeningTime={0}
                resetScrollToCoords={{ x: 0, y: 0 }} // 
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className='h-full w-full flex-col pb-24 gap-5 px-4'
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    
                    <HeaderWithArrowBack heading={i18n.t('add_vehicle')} />
                    <FormControl>
                        <VStack space="xl">
                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">{i18n.t('vehicle_name')}</Text>
                                <Input
                                    size='xl'
                                    className='bg-secondary-300 border-0 rounded-2xl'>
                                    <InputSlot className="pl-3">
                                        <InputIcon
                                            as={CarFront}
                                            className="text-secondary-500"
                                        />
                                    </InputSlot>
                                    <InputField
                                        placeholder={i18n.t('vehicle_name_placeholder')}
                                        type="text"
                                        value={vehicleName}
                                        onChangeText={setVehicleName}
                                        onFocus={() => setFocusedField('vehicleName')}  // Atualiza o campo em foco
                                        onBlur={() => setFocusedField(null)}  // Reseta o campo em foco

                                    />
                                </Input>
                            </VStack>
                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">{i18n.t('vehicle_type')}</Text>
                                <HStack className='justify-between'>

                                    {vehicleTypes.map((vehicle) => (

                                        <Pressable key={vehicle.type} onPress={() => { setVehicleType(vehicle.type) }}
                                            className={`p-4 w-32 h-32 justify-center items-center rounded-2xl  ${vehicle.type === vehicleType ? 'bg-primary-500' : ' bg-secondary-300'}`}>
                                            <VStack space='sm'>
                                                <Center>
                                                    <Icon
                                                        size='5xl'
                                                        as={vehicle.Icon}
                                                        className={` ${vehicle.type === vehicleType ? 'text-secondary-100' : 'text-secondary-500'}`}
                                                    />
                                                    <Text
                                                        className={` font-bold ${vehicle.type === vehicleType ? 'text-secondary-100' : 'text-secondary-500'}`}>
                                                        {i18n.t(`${vehicle.type}`)}</Text>
                                                </Center>
                                            </VStack>
                                        </Pressable>
                                    ))}
                                </HStack>
                            </VStack>
                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">{i18n.t('odometer_reading')}</Text>
                                <Input
                                    size='xl'
                                    className='bg-secondary-300 border-0 rounded-2xl'>
                                    <InputSlot className="pl-3">
                                        <InputIcon
                                            as={ArrowDownUp}
                                            className="text-secondary-500"
                                        />
                                    </InputSlot>
                                    <InputField
                                        maxLength={10}
                                        placeholder={i18n.t('odometer_reading_placeholder')}
                                        type="text"
                                        keyboardType='numeric'
                                        value={odometerReading}
                                        onChangeText={setOdometerReading}
                                        returnKeyType="next"
                                        onSubmitEditing={() => handleNext(oilChangeIntervalRef)}
                                        ref={odometerRef}
                                    />
                                    <InputSlot className="pr-3">
                                        <Text className='text-secondary-700'>km</Text>
                                    </InputSlot>
                                </Input>
                            </VStack>

                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">{i18n.t('oil_change_interval')}</Text>
                                <Input
                                    size='xl'
                                    className='bg-secondary-300 border-0 rounded-2xl'>
                                    <InputSlot className="pl-3">
                                        <InputIcon
                                            as={Droplets}
                                            className="text-secondary-500"
                                        />
                                    </InputSlot>
                                    <InputField
                                        keyboardType='numeric'
                                        maxLength={10}
                                        placeholder="1000"
                                        type="text"
                                        value={oilChangeInterval}
                                        onChangeText={setOilChangeInterval}
                                        onSubmitEditing={() => handleNext(observationRef)}
                                        ref={oilChangeIntervalRef}
                                    />
                                    <InputSlot className="pr-3">
                                        <Text className='text-secondary-700'>km</Text>
                                    </InputSlot>
                                </Input>

                            </VStack>

                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">{i18n.t('observations')}</Text>
                                <Input
                                    size='xl'
                                    className='bg-secondary-300 h-24 border-0 rounded-2xl items-start p-2'>
                                    <InputField
                                        className='h-24'
                                        keyboardType='default'
                                        maxLength={120}
                                        numberOfLines={3}
                                        multiline={true}
                                        textAlignVertical='top'
                                        placeholder={i18n.t('observations_placeholder')}
                                        type="text"
                                        value={vehicleObservation}
                                        onChangeText={setVehicleObservation}
                                        ref={observationRef}

                                    />
                                </Input>

                            </VStack>

                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">{i18n.t('vehicle_image')}</Text>
                                <Pressable
                                    className='bg-secondary-300 h-32 rounded-2xl'
                                    onPress={() => setModalImageVisible(true)}>
                                    <ImageBackground
                                        key={selectedImage || 'default-image'}
                                        source={selectedImage ? { uri: selectedImage } : undefined}
                                        className='w-full h-full overflow-hidden rounded-2xl items-center justify-center '
                                        imageClassName='opacity-70'
                                    >
                                        <Icon
                                            size="3xl"
                                            as={Camera}
                                            className={`${!selectedImage ? 'text-secondary-500' : 'text-secondary-100'}`}
                                        />
                                        {selectedImage === undefined && <Text size='xl' className='text-secondary-500'>{i18n.t('select_image')}</Text>}
                                    </ImageBackground>
                                </Pressable>

                            </VStack>
                            <Button size="xlg" className='bg-primary-500 py-2 rounded-2xl' disabled={isLoading} onPress={handleAddVehicle}>
                                {!isLoading ? (
                                    <HStack space='sm' className='items-center'>
                                        <ButtonText className='text-secondary-200'>{i18n.t('add_button')}</ButtonText>
                                        <ButtonIcon as={Car} size="xlg" className="stroke-secondary-200" />
                                    </HStack>) : (
                                    <HStack space="sm" className='items-center'>
                                        <ButtonText className='text-secondary-100'>{i18n.t('loading_button')}</ButtonText>
                                        <Spinner className='text-white' />
                                    </HStack>
                                )}
                            </Button>
                        </VStack>

                    </FormControl>





                </ScrollView >
            </KeyboardAwareScrollView>

            {isKeyboardVisible && focusedField !== 'vehicleName' && (
                <AnimatedButtonAboveKeyboard
                    isKeyboardVisible={isKeyboardVisible}
                    keyboardHeight={keyboard.keyboardHeight}
                    focusedField={focusedField}
                    odometerRef={odometerRef}
                    oilChangeIntervalRef={oilChangeIntervalRef}
                    observationRef={observationRef}
                    handleNext={handleNext}
                />
            )}





            <Actionsheet isOpen={modalImageVisible} onClose={() => { setModalImageVisible(false) }}>
                <ActionsheetBackdrop className='bg-black' />
                <ActionsheetContent className="bg-secondary-50 border-0">

                    <Box className='py-4 w-full'>


                        <ActionsheetItem
                            className='justify-center'
                            onPress={() => { pickImage(true); setModalImageVisible(false) }}>
                            <ActionsheetIcon className='stroke-secondary-900' size='lg' as={Focus} />
                            <ActionsheetItemText className='text-lg text-secondary-900'>{i18n.t('take_photo')}</ActionsheetItemText>
                        </ActionsheetItem>


                        <ActionsheetItem
                            className='justify-center bg-primary-500 rounded-full'
                            onPress={() => { pickImage(false); setModalImageVisible(false) }}>
                            <ActionsheetIcon className='stroke-secondary-100' size='lg' as={Images} />
                            <ActionsheetItemText className='text-lg text-secondary-100'>{i18n.t('choose_from_gallery')}</ActionsheetItemText>
                        </ActionsheetItem>

                    </Box>
                </ActionsheetContent>
            </Actionsheet>

            
        </>

    );
}

