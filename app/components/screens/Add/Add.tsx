import { Box } from '@/gluestack/ui/box';
import { Pressable } from '@/gluestack/ui/pressable';
import { Text } from '@/gluestack/ui/text'
import Header from './header/Header';
import { Alert, ScrollView } from 'react-native';
import { Heading } from '@/gluestack/ui/heading';
import { FormControl } from '@/gluestack/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/gluestack/ui/input';
import { VStack } from '@/gluestack/ui/vstack';
import { ArrowDownUp, Bike, Camera, Car, CarFront, Droplets, Focus, Images, Truck } from 'lucide-react-native';
import { Icon } from '@/gluestack/ui/icon';
import { HStack } from '@/gluestack/ui/hstack';
import { Center } from '@/gluestack/ui/center';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ImageBackground } from '@/gluestack/ui/image-background';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetIcon, ActionsheetItem, ActionsheetItemText } from '@/gluestack/ui/actionsheet';
import { Divider } from '@/gluestack/ui/divider';
import { Button, ButtonIcon, ButtonText } from '@/gluestack/ui/button';

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
    const [modalImageVisible, setModalImageVisible,] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [vehicleType, setVehicleType] = useState<string>('Car')

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a câmera.');
            }

            const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (mediaStatus.status !== 'granted') {
                Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a galeria.');
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

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} className='px-4 h-full w-full '>
                <VStack space="xl" className='  pb-28' >
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
                                        type="text" />
                                </Input>
                            </VStack>
                            <VStack space="md">
                                <Text size="xl" className="text-secondary-900">Vehicle Type</Text>
                                <HStack className='justify-between'>

                                    {vehicleTypes.map((vehicle) => (

                                        <Pressable key={vehicle.type} onPress={() => { setVehicleType(vehicle.type) }} 
                                        className={`p-4 w-32 h-32 justify-center items-center rounded-2xl  ${vehicle.type === vehicleType ? 'bg-primary-300' : ' bg-secondary-300'}`}>
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
                                        type="text" />
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
                                        maxLength={10}
                                        placeholder="1000"
                                        type="text"
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

                                        source={selectedImage ? { uri: selectedImage } : undefined}
                                        className='w-full h-full overflow-hidden rounded-2xl items-center justify-center'
                                        imageClassName='opacity-70'
                                    >
                                        <Icon
                                            size="3xl"
                                            as={Camera}
                                            className={`${!selectedImage ? 'text-secondary-500' : 'text-secondary-100'}`}
                                        />
                                        {!selectedImage && <Text size='xl' className='text-secondary-500'>Select image</Text>}
                                    </ImageBackground>
                                </Pressable>

                            </VStack>
                            <Button size="xlg" className='bg-primary-300 py-2 rounded-2xl'>
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
                            className='justify-center bg-primary-400 rounded-full'
                            onPress={() => { pickImage(false); setModalImageVisible(false) }}>
                            <ActionsheetIcon className='stroke-secondary-200' size='lg' as={Images} />
                            <ActionsheetItemText className='text-lg text-secondary-200'>Choose from Gallery</ActionsheetItemText>
                        </ActionsheetItem>

                    </Box>
                </ActionsheetContent>
            </Actionsheet>
        </>

    );
}

