import { Box } from '@/gluestack/ui/box';
import { Text } from '@/gluestack/ui/text';
import Header from './Header/Header';
import { ScrollView, Image, RefreshControl, Vibration } from 'react-native';
import { useEffect, useState } from 'react';
import { VStack } from '@/gluestack/ui/vstack';
import { HStack } from '@/gluestack/ui/hstack';
import { Icon } from '@/gluestack/ui/icon';
import { Car, Bike, Truck, ArrowRightFromLineIcon, Trash, CarFront } from 'lucide-react-native';
import { Pressable } from '@/gluestack/ui/pressable';
import { Badge, BadgeIcon, BadgeText } from '@/gluestack/ui/badge';
import AnimatedRadioButton from '../../ui/RadioAnimated';
import { Fab, FabIcon, FabLabel } from '@/gluestack/ui/fab';
import { Link } from 'expo-router';
import { useVehicleContext } from '../../contexts/VehicleContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Center } from '@/gluestack/ui/center';
import { Button, ButtonText } from '@/gluestack/ui/button';
import * as Haptics from 'expo-haptics';
import { Divider } from '@/gluestack/ui/divider';
import { Spinner } from '@/gluestack/ui/spinner';

export default function HomePage() {
  const { vehicles, loadVehicles } = useVehicleContext();
  const [selectedVehicles, setSelectedVehicles] = useState<Set<number>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  useEffect(() => {
    setFilteredVehicles(
      vehicles.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, vehicles]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadVehicles();
    setIsRefreshing(false);
  };

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

    setIsDeleting(true)
    if (isSelecting && selectedVehicles.size === 0) {
      setIsDeleting(false)
      return
    };

    const updatedVehicles = vehicles.filter((_, index) => !selectedVehicles.has(index));
    setSelectedVehicles(new Set());
    setIsSelecting(false);

    await AsyncStorage.setItem('@vehicles', JSON.stringify(updatedVehicles));


    await loadVehicles();
    setIsDeleting(false)
  };

  return (
    <>
      <Box className="h-full w-full ">
        <Header
          allowMultipleSelect={allowMultipleSelect}
          isSelecting={isSelecting}
          setSearchQuery={setSearchQuery} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          className='h-full'
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <VStack space="md" className='px-4 pb-32'>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, index) => (

                <Link
                  key={index}
                  className='w-full'
                  href={{
                    pathname: '/(stack)/vehicle/[id]',
                    params: { id: vehicle.id }
                  }}
                  asChild

                >
                  <Pressable
                    className={`p-4w-full bg-secondary-300 p-1 rounded-2xl`}
                    onLongPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                      allowMultipleSelect()
                    }}
                    onPress={(e) => {
                      if (isSelecting) {
                        e.preventDefault(); // Impede o redirecionamento
                        toggleSelection(index);
                      }
                    }}
                  >
                    <HStack className='w-full h-24 justify-between  items-center'>
                      {isSelecting && (
                        <Box className='w-1/12 -mr-6 ml-1 items-center justify-center'>
                          <AnimatedRadioButton
                            isSelected={selectedVehicles.has(index)}
                            onPress={() => toggleSelection(index)}
                          />
                        </Box>
                      )}
                      {(vehicle.image !== undefined ? (<Image
                        source={{ uri: vehicle.image }}
                        style={{ width: 84, height: 84, borderRadius: 16 }}
                      />) : (
                        <Box
                          className='bg-secondary-500 w-24 h-full rounded-2xl justify-center items-center flex'

                        >
                          <Icon as={getVehicleIcon(vehicle.type)} className='text-secondary-300 w-4/6 h-4/6 my-auto' />

                        </Box>
                      ))}

                      <VStack className='w-7/12 justify-between'>
                        <HStack className='items-center' space='md'>
                          <Text className="text-secondary-900" size="lg" numberOfLines={1} ellipsizeMode='tail' bold>{vehicle.name.length > 14 ? `${vehicle.name.slice(0, 14)}...` : vehicle.name}</Text>
                          <Badge size='md' className='gap-1 bg-secondary-200 rounded-2xl'>
                            <BadgeText className='text-secondary-800'>{vehicle.type}</BadgeText>
                            <BadgeIcon className='text-secondary-800' as={getVehicleIcon(vehicle.type)} />
                          </Badge>
                        </HStack>
                        <Text className="text-secondary-500">Odometer: {vehicle.odometer} km</Text>
                        <Text className="text-secondary-500">Oil Change Interval: {vehicle.oilInterval} km</Text>

                      </VStack>

                      {!isSelecting && (<Box className='w-1/12'>
                        <Icon as={ArrowRightFromLineIcon} className='stroke-secondary-600' />
                      </Box>)}
                    </HStack>
                  </Pressable>

                </Link>

              ))
            ) : (
              <Center className='py-28'>
                <VStack space='md'>

                  {searchQuery === '' ? (<Text className="text-secondary-500 text-xl">No vehicles added yet.</Text>) : (<Text className="text-secondary-500 text-xl">Vehicle not found.</Text>)}
                  <Link href={'/(stack)/add'} asChild>
                    <Button>
                      <ButtonText className='text-lg text-secondary-100 font-semibold font-body '>Add Vehicle</ButtonText>
                    </Button>
                  </Link>
                </VStack>
              </Center>
            )}
          </VStack>
        </ScrollView>

      </Box>
      {isSelecting && (
        <Fab
          onPress={deleteSelectedVehicles}
          className={`bg-primary-500 p-4 ${selectedVehicles.size === 0 && 'bg-secondary-500'}`}
          style={{ marginBottom: 140 }}
          isDisabled={selectedVehicles.size === 0}
          placement='bottom right'
        >
          {isDeleting ? (<Spinner className='text-secondary-100' />) : (
            <Icon as={Trash} size='2xl' className='text-secondary-100' />
          )}
        </Fab>
      )}
    </>
  );
}
