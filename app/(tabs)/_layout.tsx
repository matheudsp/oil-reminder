import { TabBar } from '@/app/components/navigation/TabBar';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {


  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen name='index' options={{ title: "Vehicles" }} />
      <Tabs.Screen name='add' options={{ title: "Add" }} />
      <Tabs.Screen name='about' options={{ title: "About" }} />
    </Tabs>
  );
}
