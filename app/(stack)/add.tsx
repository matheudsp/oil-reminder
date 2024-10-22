import AddPage from '@/app/components/screens/Add/Add';
import Layout from '../components/ui/Layout';
import { useLanguage } from '../components/contexts/LanguageContext';




export default function add() {
  useLanguage()
  return (
    
      <Layout>
        <AddPage />
      </Layout>
    
  );
}


