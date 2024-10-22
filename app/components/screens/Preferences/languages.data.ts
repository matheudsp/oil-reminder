import { ImageSourcePropType } from "react-native"

interface ILanguageItem {
    lang: string,
    langName: string,
    imagePath: ImageSourcePropType
}


export const languageItems: ILanguageItem[] = [
    {
        lang: 'pt',
        langName : 'Português - Brasil',
        imagePath: require('@/assets/locales/brazil-flag.png'),
        
    },
    {
        lang: 'en',
        langName : 'English - United States',
        imagePath: require('@/assets/locales/usa-flag.png'),
        
    }
]