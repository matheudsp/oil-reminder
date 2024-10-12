
import React, { FC } from 'react'
import { Text } from '@/gluestack/ui/text'
import { Box } from '@/gluestack/ui/box'
import { CircleCheck, Ellipsis, EllipsisVertical, MenuIcon, SearchIcon } from 'lucide-react-native'
import { Input, InputField, InputIcon, InputSlot } from '@/gluestack/ui/input'
import { Heading } from '@/gluestack/ui/heading'
import { VStack } from '@/gluestack/ui/vstack'
import { HStack } from '@/gluestack/ui/hstack'
import { Menu, MenuItem, MenuItemLabel } from '@/gluestack/ui/menu'

import { Button, ButtonIcon } from '@/gluestack/ui/button'
import { Icon } from '@/gluestack/ui/icon'
import { TouchableOpacity } from 'react-native'

interface IHeader {
    allowMultipleSelect: () => void
    isSelecting: boolean
}

const Header: FC<IHeader> = ({ allowMultipleSelect, isSelecting }) => {
    return (
        <Box className="p-4 w-full">
            <VStack space='md'>
                <HStack className='justify-between items-center'>
                    {isSelecting ? (
                        <TouchableOpacity className='p-1'onPress={allowMultipleSelect}>
                            <Text size='xl' bold>OK</Text>
                        </TouchableOpacity>) : (<Menu
                            className="bg-white border-0 px-6 rounded-2xl shadow-hard-3"
                            offset={5}
                            trigger={({ ...triggerProps }) => {
                                return (
                                    <Button {...triggerProps} action='secondary' size="sm" className='w-9 h-9 rounded-full bg-secondary-300'>
                                        <ButtonIcon as={Ellipsis} size='md' className=' stroke-secondary-800' />
                                    </Button>
                                );
                            }}
                        >
                            <MenuItem
                                key="Select"
                                onPress={allowMultipleSelect}
                                textValue="Selection"
                                className="justify-between"
                            >
                                <MenuItemLabel size="md" bold>Select vehicles</MenuItemLabel>
                                <Icon as={CircleCheck} className='stroke-secondary-800' />
                            </MenuItem>

                        </Menu>)}

                    <Text>Logo</Text>
                </HStack>
                <VStack space='xs'>
                    <Heading size="2xl" className="text-secondary-900 text-start">My Vehicles</Heading>
                    <Input size="md" className="border-0 rounded-2xl bg-secondary-300">
                        <InputSlot className="px-4 h-full">
                            <InputIcon
                                as={SearchIcon}
                                className='text-secondary-800'
                            />
                        </InputSlot>
                        <InputField placeholder="Search" className='text-secondary-800' />
                    </Input>
                </VStack>
            </VStack>
        </Box>
    )
}

export default Header