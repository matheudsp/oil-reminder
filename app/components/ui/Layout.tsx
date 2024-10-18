import React, { ReactNode } from 'react';
import { Box } from '@/gluestack/ui/box';
import { Dimensions, Platform } from 'react-native';

interface ILayout {
    children: ReactNode;
}

export default function Layout({ children }: ILayout) {
    const height = Dimensions.get('window').height;

    const topHeight = Platform.OS === 'ios' ? height * 0.05 : height * 0.03;

    return (
        <Box style={{ top: topHeight }}>
            {children}
        </Box>
    );
}
