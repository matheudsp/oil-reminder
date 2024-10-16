import React, { PropsWithChildren, useState } from 'react';
import { Box } from '@/gluestack/ui/box';
import { TouchableOpacity } from 'react-native';
import { Text } from '@/gluestack/ui/text';
import { Icon } from '@/gluestack/ui/icon';
import { ChevronDown, ChevronRight } from 'lucide-react-native';



export default function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box>
            <TouchableOpacity
                className='flex-row items-center gap-[6px]'
                onPress={() => setIsOpen((value) => !value)}
                activeOpacity={0.8}>
                <Icon
                    as={isOpen ? ChevronDown : ChevronRight}
                    size='xl'
                    className='text-secondary-700'
                />
                <Text className='font-semibold text-xl text-secondary-800'>{title}</Text>
            </TouchableOpacity>
            {isOpen && <Box className='mt-[6px] ml-6'>{children}</Box>}
        </Box>
    );
}
