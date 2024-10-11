
import { Box } from '@/app/components/ui/gluestack/box'
import { Icon } from '@/app/components/ui/gluestack/icon'

import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import { Pressable } from 'react-native'

export default function Header() {
    return (
        <Box className='h-20 flex justify-center items-start'>
            <Pressable className='p-4 rounded-2xl bg-secondary-300'>
                <Icon as={ArrowLeft} size={"2xl"} className="text-secondary-500" />
            </Pressable>
        </Box>
    )
}