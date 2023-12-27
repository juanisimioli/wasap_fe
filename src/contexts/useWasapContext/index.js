"use client";
import { createContext, useContext } from "react";
import useWasap from "@/hooks/useWasap";

const WasapContext = createContext(null);
WasapContext.displayName = "WasapContext";

export const WasapContextProvider = ({ children }) => {
  const {
    smartContractVersion,
    isUserRegistered,
    userInfo,
    contactList,
    contactSelectedData,
    chat,
    isCreatingAccount,
    isAddingContact,
    isLoadingCheckingUserExist,
    isUpdatingUserInfo,
    isUpdatingContactName,
    isSendingText,
    isSendingPayment,
    isNewContactOpen,
    setIsNewContactOpen,
    isProfileOpen,
    setIsProfileOpen,
    contactSelected,
    handleSelectContact,
    checkUserExists,
    createAccount,
    addContact,
    sendText,
    resendText,
    sendPayment,
    resendPayment,
    getUserInfo,
    updateContactName,
    updateUserInfo,
  } = useWasap();

  const value = {
    smartContractVersion,
    isUserRegistered,
    userInfo,
    contactList,
    contactSelectedData,
    chat,
    isCreatingAccount,
    isAddingContact,
    isLoadingCheckingUserExist,
    isUpdatingUserInfo,
    isUpdatingContactName,
    isSendingText,
    isSendingPayment,
    isNewContactOpen,
    setIsNewContactOpen,
    isProfileOpen,
    setIsProfileOpen,
    contactSelected,
    handleSelectContact,
    checkUserExists,
    createAccount,
    addContact,
    sendText,
    resendText,
    sendPayment,
    resendPayment,
    getUserInfo,
    updateContactName,
    updateUserInfo,
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
