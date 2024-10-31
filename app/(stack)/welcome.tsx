import Layout from '../components/ui/Layout';
import { useLanguage } from '../components/contexts/LanguageContext';
import WelcomePage from '../components/screens/Welcome/welcome';






export default function welcome() {
  useLanguage()
  return (
    <Layout>
      <WelcomePage/>
    </Layout>


  );
}


