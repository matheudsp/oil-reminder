import { Feather, FontAwesome } from "@expo/vector-icons";

export const icon = {
    index: (props: any) =>  <FontAwesome name='car' size={24} {...props} />,
    add: (props: any) => <Feather name='plus' size={24} {...props} />,
    about: (props: any) => <Feather name='info' size={24} {...props} />

}