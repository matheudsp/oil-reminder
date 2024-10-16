import React from 'react';
import { Toast, ToastTitle, useToast } from '@/gluestack/ui/toast';
import { Divider } from '@/gluestack/ui/divider';
import { LucideIcon } from 'lucide-react-native';
import { Icon } from '@/gluestack/ui/icon';
import { Platform } from 'react-native';
interface IToast {
    message: string
    icon: LucideIcon
    toastId: any
}

const CustomToast = ({ message, icon, toastId }: IToast) => {
    return (
        <Toast
            nativeID={toastId}
            className={`px-5 py-3 gap-4 shadow-soft-1 bg-primary-800 items-center flex-row 
                        ${Platform.OS === 'ios' ? '' : 'mt-10'}
                        `}
        >
            <Icon
                as={icon}
                size="xl"
                className="stroke-secondary-200"
            />
            <Divider
                orientation="vertical"
                className="h-[30px] bg-secondary-200"
            />
            <ToastTitle size="md" className="text-secondary-200">
                {message}
            </ToastTitle>
        </Toast>
    );
}

export default CustomToast;
