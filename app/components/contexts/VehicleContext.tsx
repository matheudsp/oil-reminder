import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface VehicleContextType {
  vehicles: any[];
  loadVehicles: () => Promise<void>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: React.ReactNode }) => {
  const [vehicles, setVehicles] = useState<any[]>([]);

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

  return (
    <VehicleContext.Provider value={{ vehicles, loadVehicles }}>
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
