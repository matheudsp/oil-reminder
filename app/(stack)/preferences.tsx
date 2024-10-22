
import Layout from '../components/ui/Layout';
import { useLanguage } from '../components/contexts/LanguageContext';
import PreferencesPage from '../components/screens/Preferences/Preferences';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';





export default function preferences() {
  useLanguage()
  return (
    <BottomSheetModalProvider>
      <Layout className='w-full h-full'>
        <PreferencesPage />
      </Layout>
    </BottomSheetModalProvider>

  );
}


