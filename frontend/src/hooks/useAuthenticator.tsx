/* eslint-disable no-unused-expressions */
import React, { createContext, useContext, useState } from 'react';

interface AuthenticatorProviderProps {
  children: React.ReactNode;
}

interface AuthenticatorContextData {
  user: User;
  loadData: (email: string, password: string) => void;
}

interface User {
  email: string;
  password: string;
}

const AuthenticatorContext = createContext({} as AuthenticatorContextData);

export function AuthenticatorProvider({
  children,
}: AuthenticatorProviderProps): JSX.Element {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  const loadData = async (email: string, password: string) => {
    setUser({ email, password });
  };

  return (
    <AuthenticatorContext.Provider
      value={{
        loadData,
        user,
      }}
    >
      {children}
    </AuthenticatorContext.Provider>
  );
}

export function useAuthenticator(): AuthenticatorContextData {
  const context = useContext(AuthenticatorContext);
  return context;
}
