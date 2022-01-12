/* eslint-disable no-unused-expressions */
import React, { createContext, useContext, useState } from 'react';

interface AuthenticatorProviderProps {
  children: React.ReactNode;
}

interface AuthenticatorContextData {
  user: User;
  loadData: (
    email: string,
    password: string,
    userId: string,
    fidelidadePontuacao: number,
    fidelidade: number
  ) => void;
}

interface User {
  email: string;
  password: string;
  userId: string;
  fidelidadePontuacao: number;
  fidelidade: number;
}

const AuthenticatorContext = createContext({} as AuthenticatorContextData);

export function AuthenticatorProvider({
  children,
}: AuthenticatorProviderProps): JSX.Element {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    userId: '',
    fidelidadePontuacao: 0,
    fidelidade: 0,
  });

  const loadData = async (
    email: string,
    password: string,
    userId: string,
    fidelidadePontuacao: number,
    fidelidade: number
  ) => {
    setUser({ email, password, userId, fidelidadePontuacao, fidelidade });
  };

  // console.log(user.email);
  // console.log(user.userId);
  // console.log(user.password);
  // console.log(user.fidelidadePontuacao);
  // console.log(user.fidelidade);

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
