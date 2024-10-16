


import { useEffect, useState } from 'react';
import Vehicle from '../../components/screens/Vehicle/Vehicle';
import Layout from '../../components/ui/Layout';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Spinner } from '@/gluestack/ui/spinner';
import { useLocalSearchParams } from 'expo-router';
import { IVehicle } from '@/app/types/vehicle.interface';

export default function vehicle() {
  const { id } = useLocalSearchParams();

  const [vehicleData, setVehicleData] = useState<IVehicle>();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const storedVehicles = await AsyncStorage.getItem('@vehicles');
        const vehiclesArray = storedVehicles ? JSON.parse(storedVehicles) : [];

        const vehicleId = Array.isArray(id) ? id[0] : id;  // Certifica-se de que 'id' seja uma string antes de convertê-lo para número
        const vehicle = vehiclesArray.find((v: { id: number }) => v.id === parseInt(vehicleId));  //Pega o primeiro valor se for um array
        setVehicleData(vehicle);
      } catch (error) {
        console.error('Failed to load vehicle', error);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  if (!vehicleData) {
    return <Spinner />
  }
  return (
    
      <Vehicle vehicle={vehicleData} />
    
  );
}

