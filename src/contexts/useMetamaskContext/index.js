"use client";
import { createContext, useContext } from "react";
import useMetamask from "@/hooks/useMetamask";

const MetamaskContext = createContext(null);
MetamaskContext.displayName = "MetamaskContext";

export const MetamaskContextProvider = ({ children }) => {
  const {
    wallet,
    error,
    errorMessage,
    isMetamask,
    isAllowedChainId,
    isConnecting,
    connectMetaMask,
    clearError,
    updateBalance,
  } = useMetamask();

  const value = {
    wallet,
    error,
    errorMessage,
    isMetamask,
    isAllowedChainId,
    isConnecting,
    connectMetaMask,
    clearError,
    updateBalance,
  };

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  );
};

export const useMetamaskContext = () => {
  const context = useContext(MetamaskContext);

  if (!context)
    throw new Error(
      `useMetamaskContext must be used within MetamaskContextProvider`
    );

  return context;
};
