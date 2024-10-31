import React, { FC, useCallback, useRef, useState } from 'react';
import { Text } from '@/gluestack/ui/text';
import * as Updates from 'expo-updates';
import { Box } from '@/gluestack/ui/box';
import HeaderWithArrowBack from '../../ui/HeaderWithArrowBack';
import { Image, TouchableOpacity } from 'react-native';
import { VStack } from '@/gluestack/ui/vstack';
import { HStack } from '@/gluestack/ui/hstack';
import { CloseIcon, Icon } from '@/gluestack/ui/icon';
import { ChevronRight, Globe, Moon, Lock, Check, Database } from 'lucide-react-native';
import i18n from '@/app/config/i18n';
import { Divider } from '@/gluestack/ui/divider';
import { languageItems } from './languages.data';
import {

    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useLanguage } from '../../contexts/LanguageContext';
import { Heading } from '@/gluestack/ui/heading';
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/gluestack/ui/alert-dialog';
import { Button, ButtonText } from '@/gluestack/ui/button';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const PreferencesPage: FC = () => {
    const { language, changeLanguage } = useLanguage();
    const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false)

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
            await Updates.reloadAsync();
            console.log('Storage successfully cleared!');
        } catch (e) {
            console.log('Failed to clear the async storage.', e);
        }
        setShowAlertDialog(false)
    };



    const handleLanguage = (lang: string) => {
        changeLanguage(lang)
        bottomSheetModalRef.current?.close();
    }
    return (
        <>



            <VStack className='px-4'>
                <HeaderWithArrowBack heading={i18n.t('preferences')} />
                <TouchableOpacity className="" onPress={handlePresentModalPress} >
                    <HStack className="px-4 py-4 items-center justify-between">
                        <HStack className="items-center " space="lg">
                            <Icon as={Globe} size="2xl" className="text-secondary-600" />
                            <VStack className="text-start items-start">
                                <Text className="text-secondary-900" size="lg" bold>{i18n.t('language')}</Text>
                                <Text className="text-secondary-600" size="md">{i18n.t('language_title')}</Text>
                            </VStack>
                        </HStack>
                        <Icon as={ChevronRight} size="2xl" className="text-secondary-600" />
                    </HStack>
                </TouchableOpacity>

                <Divider className="my-0.5 bg-secondary-300" />

                <TouchableOpacity className="" onPress={() => { setShowAlertDialog(true) }}>
                    <HStack className="px-4 py-4 items-center justify-between">
                        <HStack className="items-center " space="lg">
                            <Icon as={Database} size="2xl" className="text-secondary-600" />
                            <VStack className="text-start items-start">
                                <Text className="text-secondary-900" size="lg" bold>{i18n.t('clear_data')}</Text>
                                <Text className="text-secondary-600" size="md">{i18n.t('clear_data_info')}</Text>
                            </VStack>
                        </HStack>
                        <Icon as={ChevronRight} size="2xl" className="text-secondary-600" />
                    </HStack>
                </TouchableOpacity>


                <Divider className="my-0.5 bg-secondary-300" />

                <TouchableOpacity className="" >
                    <HStack className="px-4 py-4 items-center justify-between">
                        <HStack className="items-center " space="lg">
                            <Icon as={Moon} size="2xl" className="text-secondary-600" />
                            <VStack className="text-start items-start">
                                <Text className="text-secondary-900 line-through" size="lg" bold>{i18n.t('appearance')}</Text>
                                <Text className="text-secondary-600 line-through" size="md">{i18n.t('in_progress')}</Text>
                            </VStack>
                        </HStack>

                        <Icon as={Lock} size="2xl" className="text-secondary-600" />
                    </HStack>
                </TouchableOpacity>


            </VStack >


            <BottomSheetModal
                ref={bottomSheetModalRef}
            >

                <BottomSheetView

                    className='flex items-center w-full pb-28 px-5 '
                >
                    <HStack className='justify-between items-center w-full py-3'>
                        <Heading>
                            <Text size='2xl'>{i18n.t('choose_language')}</Text>
                        </Heading>
                        <TouchableOpacity onPress={handleCloseModalPress} className='bg-secondary-400 p-2 rounded-full'>
                            <Icon as={CloseIcon} size='xl' className='text-secondary-100' />
                        </TouchableOpacity>
                    </HStack>

                    {languageItems.map(item => (
                        <React.Fragment key={item.lang}>
                            <TouchableOpacity key={item.lang} className="w-full py-5" onPress={() => { handleLanguage(item.lang) }} >
                                <HStack className="  justify-between">

                                    <HStack space='lg' className='items-center'>
                                        <Image
                                            className='w-10 h-8 rounded-lg'
                                            source={item.imagePath}
                                        />

                                        <Text className="text-secondary-900" size="lg" bold>{item.langName}</Text>

                                    </HStack>

                                    {language === item.lang && (<Icon as={Check} size='2xl' className='text-primary-500' />)}

                                </HStack>
                            </TouchableOpacity>
                            <Divider className="my-0.5 bg-secondary-300" />
                        </React.Fragment>
                    ))}


                </BottomSheetView>
            </BottomSheetModal>
            <AlertDialog isOpen={showAlertDialog} onClose={() => { setShowAlertDialog(false) }}>
                <AlertDialogBackdrop className="bg-black" />
                <AlertDialogContent className="bg-secondary-100 border-0 rounded-2xl">
                    <AlertDialogHeader>
                        <Heading className="text-typography-950 font-semibold" size="md">
                            {i18n.t('delete_dialog_title')}
                        </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                        <Text size="sm">
                            {i18n.t('delete_dialog_text')}
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className='w-full justify-between'>
                        <Button
                            className='w-[48%]'
                            variant="outline"
                            action="secondary"
                            onPress={() => {
                                setShowAlertDialog(false)
                            }}
                        >
                            <ButtonText>{i18n.t('cancel')}</ButtonText>
                        </Button>
                        <Button

                            className='w-[48%] bg-red-600'
                            onPress={() => { clearStorage() }}
                        >
                            <ButtonText size='sm' className='text-secondary-100 '>{i18n.t('delete_button')}</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


        </>



    );
}

export default PreferencesPage