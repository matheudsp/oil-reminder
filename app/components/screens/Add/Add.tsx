import { Box } from '@/gluestack/ui/box';
import { Pressable } from '@/gluestack/ui/pressable';
import { Text } from '@/gluestack/ui/text'
import Header from './header/Header';
import { Alert, ScrollView } from 'react-native';
import { Heading } from '@/gluestack/ui/heading';
import { FormControl } from '@/gluestack/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/gluestack/ui/input';
import { VStack } from '@/gluestack/ui/vstack';
import { ArrowDownUp, Bike, Camera, Car, CarFront, CircleAlert, CircleX, Droplets, Focus, Images, Truck } from 'lucide-react-native';
import { Icon } from '@/gluestack/ui/icon';
import { HStack } from '@/gluestack/ui/hstack';
import { Center } from '@/gluestack/ui/center';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ImageBackground } from 'react-native';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetIcon, ActionsheetItem, ActionsheetItemText } from '@/gluestack/ui/actionsheet';
import { Button, ButtonIcon, ButtonText } from '@/gluestack/ui/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useVehicleContext } from '../../contexts/VehicleContext';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/gluestack/ui/toast';
import { Divider } from '@/gluestack/ui/divider';

const vehicleTypes = [
    {
        type: 'Car',
        Icon: Car
    },
    {
        type: 'Motorcycle',
        Icon: Bike
    },
    {
        type: 'Truck',
        Icon: Truck
    }
]
export default function AddPage() {
    const [modalImageVisible, setModalImageVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [vehicleType, setVehicleType] = useState<string>('Car');
    const [vehicleName, setVehicleName] = useState<string>('');
    const [odometerReading, setOdometerReading] = useState<string>('');
    const [oilChangeInterval, setOilChangeInterval] = useState<string>('');
    const router = useRouter();
    const toast = useToast()
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
                            <Toast
                                nativeID={toastId}
                                className="px-5 py-3 gap-4 shadow-soft-1 bg-primary-800 items-center flex-row"
                            >

                                <Icon
                                    as={CircleAlert}
                                    size="xl"
                                    className="stroke-secondary-200"
                                />
                                <Divider
                                    orientation="vertical"
                                    className="h-[30px] bg-secondary-200"
                                />
                                <ToastTitle size="md" className='text-secondary-200'>We need permission to access the camera.</ToastTitle>
                            </Toast>
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
                            <Toast
                                nativeID={toastId}
                                className="px-5 py-3 gap-4 shadow-soft-1 bg-primary-800 items-center flex-row"
                            >

                                <Icon
                                    as={CircleAlert}
                                    size="xl"
                                    className="stroke-secondary-200"
                                />
                                <Divider
                                    orientation="vertical"
                                    className="h-[30px] bg-secondary-200"
                                />
                                <ToastTitle size="md" className='text-secondary-200'>We need permission to access the gallery.</ToastTitle>
                            </Toast>
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

    const handleAddVehicle = async () => {
        if (!vehicleName || !odometerReading || !oilChangeInterval) {
            toast.show({
                placement: "top",
                render: ({ id }) => {
                    const toastId = "toast-" + id
                    return (
                        <Toast
                            nativeID={toastId}
                            className="px-5 py-3 gap-4 shadow-soft-1 bg-primary-800 items-center flex-row"
                        >

                            <Icon
                                as={CircleAlert}
                                size="xl"
                                className="stroke-secondary-200"
                            />
                            <Divider
                                orientation="vertical"
                                className="h-[30px] bg-secondary-200"
                            />
                            <ToastTitle size="md" className='text-secondary-200'>Preencha os campos antes de adicionar.</ToastTitle>
                        </Toast>
                    )
                }
            })
            return;
        }

        const vehicleData = {
            name: vehicleName,
            type: vehicleType,
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
                        <Toast
                            nativeID={toastId}
                            className="px-5 py-3 gap-4 shadow-soft-1 bg-primary-800 items-center flex-row"
                        >

                            <Icon
                                as={CircleAlert}
                                size="xl"
                                className="stroke-secondary-200"
                            />
                            <Divider
                                orientation="vertical"
                                className="h-[30px] bg-secondary-200"
                            />
                            <ToastTitle size="md" className='text-secondary-200'>Vehicle added successfully!</ToastTitle>
                        </Toast>
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
                        <Toast
                            nativeID={toastId}
                            className="px-5 py-3 gap-4 shadow-soft-1 bg-primary-800 items-center flex-row"
                        >

                            <Icon
                                as={CircleAlert}
                                size="xl"
                                className="stroke-secondary-200"
                            />
                            <Divider
                                orientation="vertical"
                                className="h-[30px] bg-secondary-200"
                            />
                            <ToastTitle size="md" className='text-secondary-200'>Unable to save vehicle information.</ToastTitle>
                        </Toast>
                    )
                }
            })
        }

        setVehicleName('')
        setVehicleType('Car')
        setOdometerReading('')
        setOilChangeInterval('')
        setSelectedImage(undefined)

    };

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} className='px-4 h-full w-full '>
                <VStack space="xl" className='  pb-32' >
                    <Header />
                    <Heading
                        size='2xl'
                    >
                        {"Add Vehicle"}
                    </Heading>

                    <FormControl>
                        <VStack space="xl">
                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">Vehicle Name</Text>
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
                                        placeholder="Name or car plate of vehicle"
                                        type="text"
                                        value={vehicleName}
                                        onChangeText={setVehicleName}
                                    />
                                </Input>
                            </VStack>
                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">Vehicle Type</Text>
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
                                                        className={`${vehicle.type === vehicleType ? 'text-secondary-100' : 'text-secondary-500'}`}>
                                                        {vehicle.type}</Text>
                                                </Center>
                                            </VStack>
                                        </Pressable>
                                    ))}
                                </HStack>
                            </VStack>
                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">Odometer Reading</Text>
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
                                        placeholder="Current mileage"
                                        type="text"
                                        keyboardType='numeric'
                                        value={odometerReading}
                                        onChangeText={setOdometerReading}
                                    />
                                    <InputSlot className="pr-3">
                                        <Text className='text-secondary-700'>km</Text>
                                    </InputSlot>
                                </Input>
                            </VStack>

                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">Oil Change Interval</Text>
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
                                    />
                                    <InputSlot className="pr-3">
                                        <Text className='text-secondary-700'>km</Text>
                                    </InputSlot>
                                </Input>

                            </VStack>

                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">Vehicle Image</Text>
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
                                        {selectedImage === undefined && <Text size='xl' className='text-secondary-500'>Select image</Text>}
                                    </ImageBackground>
                                </Pressable>

                            </VStack>
                            <Button size="xlg" className='bg-primary-500 py-2 rounded-2xl' onPress={handleAddVehicle}>
                                <ButtonText className='text-secondary-200'>Adicionar</ButtonText>
                                <ButtonIcon as={Car} size="xlg" className="stroke-secondary-200" />
                            </Button>
                        </VStack>

                    </FormControl>



                </VStack >

            </ScrollView >

            <Actionsheet isOpen={modalImageVisible} onClose={() => { setModalImageVisible(false) }}>
                <ActionsheetBackdrop className='bg-black' />
                <ActionsheetContent className="bg-secondary-50 border-0">

                    <Box className='py-4 w-full'>


                        <ActionsheetItem
                            className='justify-center'
                            onPress={() => { pickImage(true); setModalImageVisible(false) }}>
                            <ActionsheetIcon className='stroke-secondary-900' size='lg' as={Focus} />
                            <ActionsheetItemText className='text-lg text-secondary-900'>Take Photo</ActionsheetItemText>
                        </ActionsheetItem>


                        <ActionsheetItem
                            className='justify-center bg-primary-500 rounded-full'
                            onPress={() => { pickImage(false); setModalImageVisible(false) }}>
                            <ActionsheetIcon className='stroke-secondary-100' size='lg' as={Images} />
                            <ActionsheetItemText className='text-lg text-secondary-100'>Choose from Gallery</ActionsheetItemText>
                        </ActionsheetItem>

                    </Box>
                </ActionsheetContent>
            </Actionsheet>
        </>

    );
}

