import React, { createContext, useContext, useState } from 'react';

import * as auth from '../services/auth';

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
  const userLocalStorage = localStorage.getItem('@skill-test-swapi-api/user');

  const [user, setUser] = useState<JwtPayload | null>(
    userLocalStorage ? JSON.parse(userLocalStorage) : null
  );

  const signUp = async (name: string, username: string, password: string) => {
    const response = await auth.signUp(name, username, password);

    if (response) {
      setUser(response);

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
      setUser(response);

      localStorage.setItem(
        '@skill-test-swapi-api/user',
        JSON.stringify(response)
      );

      return true;
    }

    return false;
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('@skill-test-swapi-api/user');
  };

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
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
