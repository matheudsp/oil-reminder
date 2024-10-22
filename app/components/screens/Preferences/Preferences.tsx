import React, { FC, useCallback, useMemo, useRef } from 'react';
import { Text } from '@/gluestack/ui/text';

import { Box } from '@/gluestack/ui/box';
import HeaderWithArrowBack from '../../ui/HeaderWithArrowBack';
import { Button, Image, TouchableOpacity } from 'react-native';
import { VStack } from '@/gluestack/ui/vstack';
import { HStack } from '@/gluestack/ui/hstack';
import { CloseIcon, Icon } from '@/gluestack/ui/icon';
import { ChevronRight, Globe, Moon, Lock, Check } from 'lucide-react-native';
import i18n, { setAppLanguage } from '@/app/config/i18n';
import { Divider } from '@/gluestack/ui/divider';

import {

    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useLanguage } from '../../contexts/LanguageContext';
import { Heading } from '@/gluestack/ui/heading';



export const PreferencesPage: FC = () => {
    const { language, changeLanguage } = useLanguage();
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);


    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

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
                                <Text className="text-secondary-900" size="lg" bold>Idioma</Text>
                                <Text className="text-secondary-600" size="md">Idioma atual</Text>
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
                                <Text className="text-secondary-900 line-through" size="lg" bold>Aparência</Text>
                                <Text className="text-secondary-600 line-through" size="md">Modo Atual</Text>
                            </VStack>
                        </HStack>

                        <Icon as={Lock} size="2xl" className="text-secondary-600" />
                    </HStack>
                </TouchableOpacity>

            </VStack >


            <BottomSheetModal
                ref={bottomSheetModalRef}
                onChange={handleSheetChanges}
                
            >

                <BottomSheetView

                    className='flex items-center w-full pb-28 px-5 '
                >
                    <HStack className='justify-between items-center w-full py-3'>
                        <Heading>
                            <Text size='2xl'>Escolha o idioma</Text>
                        </Heading>
                        <TouchableOpacity onPress={handleCloseModalPress} className='bg-secondary-400 p-2 rounded-full'>
                            <Icon as={CloseIcon} size='xl' className='text-secondary-100' />
                        </TouchableOpacity>
                    </HStack>

                    <TouchableOpacity className="w-full py-5" onPress={() => { handleLanguage('pt') }} >
                        <HStack className="  justify-between">

                            <HStack space='lg' className='items-center'>
                                <Image
                                    className='w-10 h-8 rounded-lg'
                                    source={require('../../../../assets/locales/brazil-flag.png')}
                                />

                                <Text className="text-secondary-900" size="lg" bold>Português - Brasil</Text>

                            </HStack>

                            {language === 'pt' && (<Icon as={Check} size='2xl' className='text-primary-500' />)}

                        </HStack>
                    </TouchableOpacity>
                    <Divider className="my-0.5 bg-secondary-300" />
                    <TouchableOpacity className="w-full py-5" onPress={() => { handleLanguage('en') }}>
                        <HStack className=" justify-between">

                            <HStack space='lg' className='items-center'>
                                <Image
                                    className='w-10 h-8 rounded-lg'
                                    source={require('../../../../assets/locales/usa-flag.png')}
                                />

                                <Text className="text-secondary-900" size="lg" bold>English - United States</Text>

                            </HStack>

                            {language === 'en' && (<Icon as={Check} size='2xl' className='text-primary-500' />)}

                        </HStack>
                    </TouchableOpacity>

                </BottomSheetView>
            </BottomSheetModal>



        </>



    );
}

export default PreferencesPage