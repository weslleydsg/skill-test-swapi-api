import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type PersistedStateResponse<T> = [T, Dispatch<SetStateAction<T>>];

const usePersistedState = <T>(
  key: string,
  initialState: T
): PersistedStateResponse<T> => {
  const keyAppName = `@skill-test-swapi-api/${key}`;

  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(keyAppName);
    if (storageValue) return JSON.parse(storageValue);
    return initialState;
  });

  useEffect(() => {
    if (!state) localStorage.removeItem(keyAppName);
    else localStorage.setItem(keyAppName, JSON.stringify(state));
  }, [keyAppName, state]);

  return [state, setState];
};

export default usePersistedState;
