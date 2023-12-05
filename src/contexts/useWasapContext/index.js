"use client";
import { createContext, useContext } from "react";

import useWasap from "@/hooks/useWasap";

const WasapContext = createContext(null);
WasapContext.displayName = "WasapContext";

export const WasapContextProvider = ({ children }) => {
  const { chat } = useWasap();

  const value = {
    chat,
  };

  return (
    <WasapContext.Provider value={value}>{children}</WasapContext.Provider>
  );
};

export const useWasapContext = () => {
  const context = useContext(WasapContext);

  if (!context)
    throw new Error(`useWasapContext must be used within WasapContextProvider`);

  return context;
};
