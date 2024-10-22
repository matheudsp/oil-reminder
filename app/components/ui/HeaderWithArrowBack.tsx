
import { Box } from '@/gluestack/ui/box'
import { Heading } from '@/gluestack/ui/heading'
import { HStack } from '@/gluestack/ui/hstack'
import { Icon } from '@/gluestack/ui/icon'
import { Link, router } from 'expo-router'

import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import { Pressable } from 'react-native'

interface iHeader {
    heading?: string
}
export default function HeaderWithArrowBack({ heading }: iHeader) {
    return (
        <Box className='h-20 flex justify-center items-start'>
            <HStack className='items-center' space='md'>

                <Pressable onPress={() => {router.back()}} className='p-4 rounded-2xl bg-secondary-300'>
                    <Icon as={ArrowLeft} size="2xl" className="text-secondary-500" />
                </Pressable>

                <Heading
                    size='2xl'
                >
                    {heading}
                </Heading>
            </HStack>
        </Box>
    )
}