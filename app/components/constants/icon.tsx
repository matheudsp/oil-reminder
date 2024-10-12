import { Feather, FontAwesome } from "@expo/vector-icons";
import { ViewStyle, TextStyle } from "react-native";

interface IIconProps {
    style?: ViewStyle | TextStyle; 
    size?: number; 
    color?: string; 
}

interface IIcon {
    index: (props: IIconProps) => JSX.Element; 
    add: (props: IIconProps) => JSX.Element;   
    about: (props: IIconProps) => JSX.Element;  
    vehicle: (props: IIconProps) => JSX.Element | null; 
}

export type IconKeys = keyof IIcon; 

export const icon: IIcon = {
    index: (props: IIconProps) => <FontAwesome name='car' size={24} {...props} />,
    add: (props: IIconProps) => <Feather name='plus' size={24} {...props} />,
    about: (props: IIconProps) => <Feather name='info' size={24} {...props} />,
    vehicle: (props: IIconProps) => null
};