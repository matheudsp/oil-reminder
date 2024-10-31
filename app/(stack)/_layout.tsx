
import { Stack } from 'expo-router';
import React from 'react';



export default function StackLayout() {
  

  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen  name='welcome' options={{ title:"Welcome"}} />
      <Stack.Screen name='vehicle/[id]' options={{ title:"Vehicle"}} />
      <Stack.Screen name='add' options={{ title:"Add"}} />
      <Stack.Screen name='preferences' options={{ title:"Preferences"}} />
    </Stack>
  );
}
