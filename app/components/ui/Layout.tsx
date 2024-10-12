
import React, { ReactNode } from 'react'
import { Box } from '@/gluestack/ui/box'
import { Dimensions } from 'react-native';

interface ILayout {
    children: ReactNode
}

export default function Layout({children}: ILayout) {
    const height = Dimensions.get('window').height

    return (
        <Box style={{ top: (height * 0.05) }}>
            {children}
        </Box>
    )
}