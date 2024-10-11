import { Box } from '@/app/components/ui/gluestack/box';

import { Text } from '@/app/components/ui/gluestack/text'
import Header from './header/Header';
import { ScrollView } from 'react-native';

export default function AddPage() {
  return (
    <Box className='px-4'>
      <Header />n


      <ScrollView className=' h-full w-full'>

        <Heading />
      </ScrollView>
    </Box>

  );
}

