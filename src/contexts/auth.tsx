import React, { createContext, useContext } from 'react';

import * as auth from '../services/auth';

import usePersistedState from '../utils/usePersistedState';

import { JwtPayload } from '../interfaces/JwtPayload';

interface AuthContextData {
  signed: boolean;
  user?: JwtPayload | null;

  signIn(username: string, password: string): Promise<boolean>;
  signUp(name: string, username: string, password: string): Promise<boolean>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [fakeUser, setFakeUser] = usePersistedState<JwtPayload | null>(
    'user',
    null
  );

  const signUp = async (name: string, username: string, password: string) => {
    const response = await auth.signUp(name, username, password);

    if (response) {
      setFakeUser(response);

      localStorage.setItem(
        '@skill-test-swapi-api/user',
        JSON.stringify(response)
      );

      return true;
    }

    return false;
  };

  const signIn = async (username: string, password: string) => {
    const response = await auth.signIn(username, password);

    if (response) {
      setFakeUser(response);

      localStorage.setItem(
        '@skill-test-swapi-api/user',
        JSON.stringify(response)
      );

      return true;
    }

    return false;
  };

  const signOut = async () => setFakeUser(null);

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(fakeUser),
        user: fakeUser,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
