import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from '@/gluestack/ui/toast';
import CustomToast from '../ui/CustomToast';
import { Check, CircleAlert } from 'lucide-react-native';

interface VehicleContextType {
  vehicles: any[];
  loadVehicles: () => Promise<void>;
  updateOdometerReading: (vehicleId: number, newOdometerReading: string) => Promise<void>;
  updateObservation: (vehicleId: number, newObservation: string) => Promise<void>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: React.ReactNode }) => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const toast = useToast()

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

  useEffect(() => {
    loadVehicles();
  }, []);

  const updateObservation = async (vehicleId: number, newObservation:string) => {
    try{
      const storedVehicles = await AsyncStorage.getItem('@vehicles');
      const vehiclesArray = storedVehicles ? JSON.parse(storedVehicles) : [];

      const updatedVehicles = vehiclesArray.map((vehicle: any) => {
        if (vehicle.id === vehicleId) {
          return {
            ...vehicle,
            observation: newObservation,
          };
        }
        return vehicle;
      })

      await AsyncStorage.setItem('@vehicles', JSON.stringify(updatedVehicles));

      setVehicles(updatedVehicles);

      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return CustomToast({
            toastId: toastId,
            icon: Check,
            message: 'Observation updated successfully!',
          });
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar a observação:', error);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return CustomToast({
            toastId: toastId,
            icon: CircleAlert,
            message: 'Failed to update observation.',
          });
        },
      });
    }
  }

  const updateOdometerReading = async (vehicleId: number, newOdometerReading: string) => {
    try {
      const storedVehicles = await AsyncStorage.getItem('@vehicles');
      const vehiclesArray = storedVehicles ? JSON.parse(storedVehicles) : [];
  
      const updatedVehicles = vehiclesArray.map((vehicle: any) => {
        if (vehicle.id === vehicleId) {
          return {
            ...vehicle,
            odometer: newOdometerReading,
          };
        }
        return vehicle;
      });
  
      await AsyncStorage.setItem('@vehicles', JSON.stringify(updatedVehicles));
  
      // Atualiza o estado imediatamente após a alteração no AsyncStorage
      setVehicles(updatedVehicles);
  
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return CustomToast({
            toastId: toastId,
            icon: Check,
            message: 'Odometer updated successfully!',
          });
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar o odômetro:', error);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return CustomToast({
            toastId: toastId,
            icon: CircleAlert,
            message: 'Failed to update odometer.',
          });
        },
      });
    }
  };
  

  return (
    <VehicleContext.Provider value={{ vehicles, loadVehicles , updateOdometerReading, updateObservation}}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicleContext must be used within a VehicleProvider');
  }
  return context;
};
