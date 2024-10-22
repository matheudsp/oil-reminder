import React from 'react';
import { Button, ButtonText } from '@/gluestack/ui/button';
import { VStack } from '@/gluestack/ui/vstack';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  return (
    <VStack space="md">
      <Button onPress={() => changeLanguage('en')}>
        <ButtonText>English {language === 'en' && '(Selected)'}</ButtonText>
      </Button>
      <Button onPress={() => changeLanguage('pt')}>
        <ButtonText>Português {language === 'pt' && '(Selecionado)'}</ButtonText>
      </Button>
    </VStack>
  );
};

export default LanguageSwitcher;
