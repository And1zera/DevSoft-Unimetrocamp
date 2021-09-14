import React, { createContext, useContext, useState } from 'react';

interface ModalProviderProps {
  children: React.ReactNode;
}

interface ModalContextData {
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  isOpenModal: boolean;
}

const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps): JSX.Element {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }
  return (
    <ModalContext.Provider
      value={{
        handleOpenModal,
        handleCloseModal,
        isOpenModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextData {
  const context = useContext(ModalContext);
  return context;
}
