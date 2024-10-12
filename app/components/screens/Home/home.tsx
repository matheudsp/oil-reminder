import { Box } from '@/gluestack/ui/box';
import { Text } from '@/gluestack/ui/text';
import Header from './Header/Header';
import { ScrollView, Image, Alert, View, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VStack } from '@/gluestack/ui/vstack';
import { HStack } from '@/gluestack/ui/hstack';
import { Icon } from '@/gluestack/ui/icon';
import { Car, Bike, Truck, ArrowRightFromLineIcon, Trash } from 'lucide-react-native';
import { Pressable } from '@/gluestack/ui/pressable';
import { Badge, BadgeIcon, BadgeText } from '@/gluestack/ui/badge';
import { Button } from '@/gluestack/ui/button';
import AnimatedRadioButton from '../../ui/RadioAnimated';
import { Fab, FabIcon } from '@/gluestack/ui/fab';
import { Link } from 'expo-router';



export default function HomePage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<Set<number>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'Car':
        return Car;
      case 'Motorcycle':
        return Bike;
      case 'Truck':
        return Truck;
      default:
        return Car;
    }
  };

  const loadVehicles = async () => {
    try {
      const storedVehicles = await AsyncStorage.getItem('@vehicles');
      if (storedVehicles !== null) {
        setVehicles(JSON.parse(storedVehicles));
      }
    } catch (error) {
      console.error('Erro ao carregar os veículos:', error);
    }
  };


  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadVehicles(); 
    setIsRefreshing(false); 
  };

  const toggleSelection = (index: any) => {
    const newSelection = new Set(selectedVehicles);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    setSelectedVehicles(newSelection);
  };


  const allowMultipleSelect = () => {
    setIsSelecting(!isSelecting);
    setSelectedVehicles(new Set());
  };

  const deleteSelectedVehicles = async () => {
    if (isSelecting && selectedVehicles.size === 0) return;

    const updatedVehicles = vehicles.filter((_, index) => !selectedVehicles.has(index));
    setVehicles(updatedVehicles);
    setSelectedVehicles(new Set());
    setIsSelecting(false);

    await AsyncStorage.setItem('@vehicles', JSON.stringify(updatedVehicles));

  };





  return (
    <Box className="h-full w-full">
      <Header allowMultipleSelect={allowMultipleSelect} isSelecting={isSelecting} />

      <ScrollView 
      showsVerticalScrollIndicator={false} 
      className='h-full'
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      >
        <VStack space="xl" className='px-4 pb-32'>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <Link key={index} href={'/(tabs)/vehicle'} asChild>
                <Pressable
                  key={index}
                  className={`p-4 bg-secondary-300 rounded-2xl`}
                  onPress={(e) => {
                    if (isSelecting) {
                      e.preventDefault(); // Impede o redirecionamento
                      toggleSelection(index);
                    }
                  }}
                >
                  <HStack space="md" className='justify-between items-center'>
                    {isSelecting && (
                      <AnimatedRadioButton
                        isSelected={selectedVehicles.has(index)}
                        onPress={() => toggleSelection(index)}
                      />
                    )}
                    <Image
                      source={{ uri: vehicle.image }}
                      style={{ width: 80, height: 80, borderRadius: 10 }}
                    />
                    <VStack>
                      <HStack className='items-center' space='md'>
                        <Text className="text-secondary-900" size="xl" bold>{vehicle.name}</Text>
                        <Badge size='md' className='gap-1 bg-secondary-200 rounded-2xl'>
                          <BadgeText className='text-secondary-800'>{vehicle.type}</BadgeText>
                          <BadgeIcon className='text-secondary-800' as={getVehicleIcon(vehicle.type)} />
                        </Badge>
                      </HStack>
                      <Text className="text-secondary-500">Odometer: {vehicle.odometer} km</Text>
                      <Text className="text-secondary-500">Oil Change Interval: {vehicle.oilInterval} km</Text>
                    </VStack>
                    <Icon as={ArrowRightFromLineIcon} className='stroke-secondary-600' />
                  </HStack>
                </Pressable>
              </Link>

            ))
          ) : (
            <Text className="text-secondary-500">No vehicles added yet.</Text>
          )}
        </VStack>

      </ScrollView>
      {isSelecting && (<Fab

        onPress={deleteSelectedVehicles}
        className={`p-4 bg-primary-500 disabled:opacity-70`}
        style={{marginBottom:140}}

        placement="bottom right"
        isHovered={false}
        isDisabled={selectedVehicles.size === 0}

        isPressed={false}
      >
        <FabIcon as={Trash} size="2xl" className="stroke-secondary-100" />

      </Fab>)}
    </Box>
  );
}
