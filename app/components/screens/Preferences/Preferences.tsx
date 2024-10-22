import React, { FC, useCallback, useMemo, useRef } from 'react';
import { Text } from '@/gluestack/ui/text';

import { Box } from '@/gluestack/ui/box';
import HeaderWithArrowBack from '../../ui/HeaderWithArrowBack';
import { Button, Image, TouchableOpacity } from 'react-native';
import { VStack } from '@/gluestack/ui/vstack';
import { HStack } from '@/gluestack/ui/hstack';
import { CloseIcon, Icon } from '@/gluestack/ui/icon';
import { ChevronRight, Globe, Moon, Lock, Check } from 'lucide-react-native';
import i18n from '@/app/config/i18n';
import { Divider } from '@/gluestack/ui/divider';
import { languageItems } from './languages.data';
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
                        <>
                            <TouchableOpacity className="w-full py-5" onPress={() => { handleLanguage(item.lang) }} >
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
                        </>
                    ))}


                </BottomSheetView>
            </BottomSheetModal>



        </>



    );
}

export default PreferencesPage