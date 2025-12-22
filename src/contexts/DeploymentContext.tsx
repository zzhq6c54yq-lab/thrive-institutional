import React, { createContext, useContext, useState } from 'react';
import { deploymentPopulations, DeploymentPopulation } from '@/data/deploymentPopulations';

interface DeploymentContextType {
  activePopulation: DeploymentPopulation;
  setActivePopulation: (population: DeploymentPopulation) => void;
  setActivePopulationById: (id: string) => void;
}

const DeploymentContext = createContext<DeploymentContextType | undefined>(undefined);

export const DeploymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePopulation, setActivePopulation] = useState<DeploymentPopulation>(
    deploymentPopulations[0]
  );

  const setActivePopulationById = (id: string) => {
    const population = deploymentPopulations.find(p => p.id === id);
    if (population) {
      setActivePopulation(population);
    }
  };

  return (
    <DeploymentContext.Provider value={{ activePopulation, setActivePopulation, setActivePopulationById }}>
      {children}
    </DeploymentContext.Provider>
  );
};

export const useDeployment = () => {
  const context = useContext(DeploymentContext);
  if (!context) {
    throw new Error('useDeployment must be used within a DeploymentProvider');
  }
  return context;
};
