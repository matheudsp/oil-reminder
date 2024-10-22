import React, { ReactNode } from 'react';
import { Box } from '@/gluestack/ui/box';
import { Dimensions, Platform } from 'react-native';
import cn from 'clsx'

interface ILayout {
    children: ReactNode;
    className?: string
}

export default function Layout({ children,className}: ILayout) {
    const height = Dimensions.get('window').height;

    const topHeight = Platform.OS === 'ios' ? height * 0.05 : height * 0.03;

    return (
        <Box className={cn(className)} style={{ top: topHeight }}>
            {children}
        </Box>
    );
}
