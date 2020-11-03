import React, { createContext, useContext, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

interface LoadOverlayContextData {
  loading: boolean;
  setLoadingOverlay(state: boolean | (() => boolean)): void;
}

const LoadOverlayContext = createContext<LoadOverlayContextData>(
  {} as LoadOverlayContextData
);

export const LoadOverlayProvider: React.FC = ({ children }) => {
  const [loading, setLoadingOverlay] = useState<boolean>(false);

  return (
    <LoadOverlayContext.Provider value={{ loading, setLoadingOverlay }}>
      <LinearProgress
        hidden={!loading}
        style={{ position: 'absolute', width: '100%' }}
      />
      {children}
    </LoadOverlayContext.Provider>
  );
};

export const useLoadOverlay = () => useContext(LoadOverlayContext);
