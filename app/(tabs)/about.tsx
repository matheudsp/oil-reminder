import AboutPage from '@/app/components/screens/About/about';

import Layout from '../components/ui/Layout';
import { useLanguage } from '../components/contexts/LanguageContext';

export default function about() {

  useLanguage()
  return (
    <Layout>
      <AboutPage />
    </Layout>
  );
}


