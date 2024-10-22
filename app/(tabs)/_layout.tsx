import { TabBar } from '@/app/components/navigation/TabBar';
import { Tabs } from 'expo-router';
import React from 'react';
import { useLanguage } from '../components/contexts/LanguageContext';


export default function TabLayout() {
  useLanguage()

  return (
    <Tabs screenOptions={{ headerShown: false  }} tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen name='index' options={{ title: "Vehicles" }} />
      <Tabs.Screen name='about' options={{ title: "About" }} />
    </Tabs>
  );
}
