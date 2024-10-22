import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ptBR from '@/app/locales/ptBR.json';
import enUS from "@/app/locales/enUS.json";

const translations = {
  en: enUS,   
  pt: ptBR
};

const i18n = new I18n(translations);


export const loadLocale = async () => {
  const storedLocale = await AsyncStorage.getItem('appLanguage');
  i18n.locale = storedLocale || getLocales()[0].languageCode || 'en';
};


export const setAppLanguage = async (language: string) => {
  i18n.locale = language;
  await AsyncStorage.setItem('appLanguage', language);
};

i18n.enableFallback = true;

export default i18n;
