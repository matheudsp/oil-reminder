
import React from 'react'
import { Text } from '@/gluestack/ui/text'
import { Box } from '@/gluestack/ui/box'
import { SearchIcon } from 'lucide-react-native'
import { Input, InputField, InputIcon, InputSlot } from '@/gluestack/ui/input'

const Header = () => {
    return (
        <Box className="p-5 w-full">
            <Input variant="rounded" size="sm" className="w-full h-10">
                <InputField placeholder="Search..." />
                <InputSlot className="bg-primary-500 rounded-full h-6 w-6 m-1.5">
                    <InputIcon
                        as={SearchIcon}
                        className='text-typography-600'
                    />
                </InputSlot>
            </Input>
        </Box>
    )
}

export default Header