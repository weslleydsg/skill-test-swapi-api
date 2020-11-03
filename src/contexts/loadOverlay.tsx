import React, { createContext, useContext, useEffect, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';

interface LoadOverlayContextData {
  loading: boolean;
  setLoadingOverlay(state: boolean | (() => boolean)): void;
}

const LoadOverlayContext = createContext<LoadOverlayContextData>(
  {} as LoadOverlayContextData
);

export const LoadOverlayProvider: React.FC = ({ children }) => {
  const [loading, setLoadingOverlay] = useState<boolean>(false);

  const history = useHistory();
  useEffect(() => history.listen(() => setLoadingOverlay(false)), []);

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
