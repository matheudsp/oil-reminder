
import HomePage from '@/app/components/screens/Home/home';
import { SafeAreaView } from 'react-native';
import Layout from '../components/ui/Layout';
import { useLanguage } from '../components/contexts/LanguageContext';

export default function index() {
  useLanguage()
  
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}

