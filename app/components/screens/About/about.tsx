import { Avatar, AvatarFallbackText, AvatarImage } from '@/gluestack/ui/avatar';
import { Box } from '@/gluestack/ui/box';
import { Divider } from '@/gluestack/ui/divider';
import { Heading } from '@/gluestack/ui/heading';
import { HStack } from '@/gluestack/ui/hstack';
import { Link, LinkText } from '@/gluestack/ui/link';
import { Text } from '@/gluestack/ui/text'
import { VStack } from '@/gluestack/ui/vstack';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Collapsible from '../../ui/Collapsible';
import { Icon } from '@/gluestack/ui/icon';
import { Check, Coffee, ExternalLink, Settings } from 'lucide-react-native';
import { Linking } from 'react-native';
import { Button, ButtonText } from '@/gluestack/ui/button';
import { Center } from '@/gluestack/ui/center';
import * as Clipboard from 'expo-clipboard';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/gluestack/ui/modal';
import { useToast } from '@/gluestack/ui/toast';
import CustomToast from '../../ui/CustomToast';

import i18n from '@/app/config/i18n';
import { router } from 'expo-router';





export default function AboutPage() {



  const [showModal, setShowModal] = React.useState(false)
  const toast = useToast()
  const ref = React.useRef(null)


  const pixKey = "4bbd3c9f-78b4-415f-8783-3bdc9d6fa4b1";
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(pixKey);
    setShowModal(false)
    toast.show({
      placement: "top",
      render: ({ id }) => {
        const toastId = "toast-" + id
        return (
          CustomToast({
            toastId: toastId,
            icon: Check,
            message: (i18n.t('copy_to_clipboard_successfully'))
          })
        )
      }
    })
  };

  return (
    <>


      <ScrollView className='h-full w-full ' showsVerticalScrollIndicator={false}>

        <VStack className="px-5 py-4 flex-1 pb-48" space="lg">
          <HStack className='justify-between items-center'>
            <Heading size='2xl' className="mb-1">{i18n.t('about')}</Heading>
            <TouchableOpacity
              onPress={() => { router.push('/(stack)/preferences') }}
              className='p-2  bg-secondary-300 rounded-full'>
              <Icon
                as={Settings}
                size='2xl'
                className=' text-secondary-800' />
            </TouchableOpacity>
          </HStack>

          <VStack space="md" className='justify-center items-center'>

            <Avatar size='xl' className="bg-primary-500 ">
              <AvatarFallbackText>Matheus Pereira</AvatarFallbackText>
              <AvatarImage

                source={{
                  uri: "https://avatars.githubusercontent.com/u/86691631?v=4",
                }}
              />
            </Avatar>
            <Box>
              <Text className='text-xl font-medium'>Matheus Pereira</Text>
            </Box>


          </VStack>


          <Divider className="my-1 bg-secondary-300" />

          <Collapsible title={i18n.t('about_me_title')}>
            <Text size='md' className='font-medium text-justify text-secondary-800 '>
              {i18n.t('about_me')}
            </Text>
          </Collapsible>

          <Collapsible title={i18n.t('my_links_title')}>

            <VStack space='md'>
              <Link onPress={() => {
                const mailtoUrl = `mailto:mdsp.personal@gmail.com`;
                Linking.openURL(mailtoUrl);
              }}>
                <HStack space='sm' className='items-center'>
                  <LinkText className='text-lg font-medium  text-secondary-700'>
                    E-mail
                  </LinkText>
                  <Icon size='md' as={ExternalLink} className='text-secondary-700' />
                </HStack>
              </Link>
              <Link href="https://github.com/matheudsp">
                <HStack space='sm' className='items-center'>
                  <LinkText className='text-lg font-medium text-secondary-700'>
                    GitHub
                  </LinkText>
                  <Icon size='md' as={ExternalLink} className='text-secondary-700' />
                </HStack>
              </Link>
              <Link href="www.linkedin.com/in/matheudsp">
                <HStack space='sm' className='items-center'>
                  <LinkText className='text-lg font-medium  text-secondary-700'>
                    LinkedIn
                  </LinkText>
                  <Icon size='md' as={ExternalLink} className='text-secondary-700' />
                </HStack>
              </Link>
            </VStack>

          </Collapsible>

          <Collapsible title={i18n.t('app_origin_title')}>
            <Text size='md' className='font-medium text-justify text-secondary-800 '>
              {i18n.t('app_origin')}
            </Text>
          </Collapsible>

          <Collapsible title={i18n.t('future_improvements_title')}>
            <VStack space='md'>
              <Text size='md' className='font-medium text-secondary-800 text-justify'>
                {i18n.t('future_improvements_0')}
              </Text>

              <HStack space='md'>
                <Text className="text-secondary-800">✅</Text>
                <Text size="md" className=" font-medium  text-secondary-800 flex-1 text-justify"> {i18n.t('future_improvements_0')}</Text>
              </HStack>

              <HStack space='md'>
                <Text className="text-secondary-800">✅</Text>
                <Text size="md" className=" font-medium  text-secondary-800 flex-1 text-justify"> {i18n.t('future_improvements_2')}</Text>
              </HStack>
              <HStack space='md'>
                <Text className="text-secondary-800">✅</Text>
                <Text size="md" className=" font-medium  text-secondary-800 flex-1 text-justify"> {i18n.t('future_improvements_3')}</Text>
              </HStack>

              <HStack space='md'>
                <Text className="text-secondary-800">✅</Text>
                <Text size="md" className=" font-medium  text-secondary-800 flex-1 text-justify"> {i18n.t('future_improvements_4')}</Text>
              </HStack>

              <HStack space='md'>
                <Text className="text-secondary-800">✅</Text>
                <Text size="md" className=" font-medium text-secondary-800 flex-1 text-justify"> {i18n.t('future_improvements_5')}</Text>
              </HStack>

            </VStack>
          </Collapsible>
          <Center>
            <Button
              size="xlg"
              className='bg-primary-500 w-8/12 mt-20  rounded-2xl'
              onPress={() => { setShowModal(true) }}
            >
              <ButtonText className='text-lg text-secondary-100'>

                {i18n.t('buy_me_a_coffe')}
              </ButtonText>
              <Icon as={Coffee} size='md' className=' text-lg  text-secondary-100' />
            </Button>
          </Center>
        </VStack>


      </ScrollView >



      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        finalFocusRef={ref}
        size="lg"
      >
        <ModalBackdrop className="bg-black" />
        <ModalContent className="bg-secondary-100 border-0 rounded-2xl">
          <ModalHeader>
            <Heading size="md" className="text-secondary-900">
              {i18n.t('buy_me_a_coffe')}
            </Heading>

          </ModalHeader>
          <ModalBody className='py-4'>
            <VStack space='sm'>
              <Text className="text-base text-secondary-800">
                {i18n.t('modal-buy-me-a-coffe')}:
              </Text>
              <Text bold className='font-logo'>{pixKey}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter className='w-full justify-between'>
            <Button
              className='w-6/12'
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModal(false)
              }}
            >
              <ButtonText>{i18n.t('cancel')}</ButtonText>
            </Button>
            <Button
              className='w-6/12'
              onPress={copyToClipboard}
            >
              <ButtonText size='sm' className='text-secondary-100 '>{i18n.t('copy_to_clipboard')}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    </>
  );
}

