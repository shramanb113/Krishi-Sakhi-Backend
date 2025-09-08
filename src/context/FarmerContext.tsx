import React, { createContext, useContext, useState, useEffect } from 'react';
import { Farmer } from '../types';

interface FarmerContextType {
  currentFarmer: Farmer | null;
  setCurrentFarmer: (farmer: Farmer | null) => void;
  isLoading: boolean;
}

const FarmerContext = createContext<FarmerContextType | undefined>(undefined);

export const FarmerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFarmer, setCurrentFarmer] = useState<Farmer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load farmer data from localStorage on app start
    const savedFarmer = localStorage.getItem('currentFarmer');
    if (savedFarmer) {
      try {
        setCurrentFarmer(JSON.parse(savedFarmer));
      } catch (error) {
        console.error('Error parsing saved farmer data:', error);
        localStorage.removeItem('currentFarmer');
      }
    }
    setIsLoading(false);
  }, []);

  const updateCurrentFarmer = (farmer: Farmer | null) => {
    setCurrentFarmer(farmer);
    if (farmer) {
      localStorage.setItem('currentFarmer', JSON.stringify(farmer));
    } else {
      localStorage.removeItem('currentFarmer');
    }
  };

  return (
    <FarmerContext.Provider value={{
      currentFarmer,
      setCurrentFarmer: updateCurrentFarmer,
      isLoading
    }}>
      {children}
    </FarmerContext.Provider>
  );
};

export const useFarmer = () => {
  const context = useContext(FarmerContext);
  if (context === undefined) {
    throw new Error('useFarmer must be used within a FarmerProvider');
  }
  return context;
};