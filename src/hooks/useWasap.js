"use client";
import { useState, useEffect } from "react";
import { ethers, getAddress } from "ethers";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useToast } from "./useToast";
import useProviderAndSigner from "./useProviderAndSigner";
import { calculateChat, JsDateToEpoch, playNotification } from "@/utils/utils";
import { wasapContractAddress } from "../../config";
import { STATUS_MESSAGE } from "@/utils/utils";
import Wasap from "../../contract/Wasap.json";

const useWasap = () => {
  const { signer } = useProviderAndSigner();
  const {
    wallet: { address, chainId },
    isAllowedChainId,
  } = useMetamaskContext();

  const { handleOpenToast } = useToast();

  const [contract, setContract] = useState(null);

  // USER INFORMATION
  const [isUserRegistered, setIsUserRegistered] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [contactList, setContactList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]);

  // USER SELECTION INFORMATION
  const [contactSelected, setContactSelected] = useState(null);
  const [contactSelectedData, setContactSelectedData] = useState({
    name: "",
    avatar: "",
  });

  // LOADER flags
  const [isLoadingCheckingUserExist, setIsLoadingCheckingUserExist] =
    useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isUpdatingUserInfo, setIsUpdatingUserInfo] = useState(false);
  const [isUpdatingContactName, setIsUpdatingContactName] = useState(false);

  // UI flags
  const [isNewContactOpen, setIsNewContactOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ///////////////////////  getters  //////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const checkUserExists = async (address) => {
    try {
      return await contract.checkUserExists(address);
    } catch (e) {
      handleOpenToast("error", "Problem checking user exist");
      console.error(e);
    }
  };

  const getUserInfo = async (address) => {
    try {
      return await contract.getUserInfo(address);
    } catch (e) {
      handleOpenToast("error", "Problem getting user info");
      console.error(e);
    }
  };

  const getUserContactList = async () => {
    try {
      return await contract.getUserContactList();
    } catch (e) {
      handleOpenToast("error", "Problem getting user contact list");
      console.error(e);
    }
  };

  const readMessages = async (contact) => {
    try {
      return await contract.readMessages(contact);
    } catch (e) {
      handleOpenToast("error", "Problem reading messages");
      console.error(e);
    }
  };

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////  setters  /////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const createAccount = async (_name, _avatar) => {
    setIsCreatingAccount(true);
    try {
      const createAccount = await contract.createAccount(_name, _avatar);
      createAccount.wait();
    } catch (e) {
      handleOpenToast("error", "Problem creating account");
      console.error(e);
    }
  };

  const addContact = async (addressContact, contactName) => {
    setIsAddingContact(true);
    try {
      const contactAdded = await contract.addContact(
        addressContact,
        contactName
      );
      contactAdded.wait();
      setIsNewContactOpen(false);
    } catch (e) {
      handleOpenToast("error", "Problem adding contact");
      console.error(e);
    } finally {
      setIsAddingContact(false);
    }
  };

  const sendMessage = async (contactSelected, text) => {
    const timestamp = JsDateToEpoch();
    updateMessageStatusToSending(timestamp, text);
    setIsSendingMessage(true);
    try {
      const messageSent = await contract.sendMessage(contactSelected, text);
      updateMessageStatusToSent(timestamp);
      messageSent.wait();
    } catch (e) {
      handleOpenToast("error", "Problem sending message");
      console.error(e);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const updateUserInfo = async (_userAvatar, _userName) => {
    setIsUpdatingUserInfo(true);
    try {
      const update = await contract.updateUserInfo(_userAvatar, _userName);
      update.wait();
    } catch (e) {
      handleOpenToast("error", "Problem updating user info");
      console.error(e);
    } finally {
      setIsUpdatingUserInfo(false);
      getUserInfo(address);
      setIsProfileOpen(false);
    }
  };

  const updateContactName = async (_contactName) => {
    setIsUpdatingContactName(true);
    try {
      const update = await contract.updateContactName(
        contactSelected,
        _contactName
      );
      update.wait();
    } catch (e) {
      handleOpenToast("error", "Problem updating contact info");
      console.error(e);
    }
  };

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  //////////////////////  handlers  //////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const handleCheckUserExist = async (address) => {
    if (!address) return;
    setIsLoadingCheckingUserExist(true);
    const response = await checkUserExists(address);
    setIsUserRegistered(response);
    setIsLoadingCheckingUserExist(false);
  };

  const handleGetUserInfo = async (address) => {
    if (!isUserRegistered) return;
    const userInfo = await getUserInfo(address);
    if (!userInfo) return;
    setUserInfo({ name: userInfo[0], avatar: userInfo[1] });
  };

  const handleSetContactSelectedData = () => {
    const contactData = contactList.find(
      (contact) => contact.contactAddress === contactSelected
    );

    setContactSelectedData({
      name: contactData.name,
      avatar: contactData.avatar,
    });
  };

  const handleReadMessages = async () => {
    if (!contactSelected) return;
    const messages = await readMessages(contactSelected);
    setMessages(messages);
  };

  const handleGetUserContactList = async () => {
    const contactList = await getUserContactList();
    setContactList(contactList);
  };

  const updateMessageStatusToSending = (timestamp, text) => {
    setMessages((prev) => [
      ...prev,
      {
        text,
        status: STATUS_MESSAGE.Sending,
        sender: getAddress(address),
        timestamp,
      },
    ]);
  };

  const updateMessageStatusToSent = (timestamp) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.timestamp === timestamp
          ? { ...message, status: STATUS_MESSAGE.Sent }
          : message
      )
    );
  };

  const handleSelectContact = (contactAddress) => {
    setContactSelected(contactAddress);
  };

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  /////////////////////  useEFFECTS  /////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    if (isNewContactOpen) setIsNewContactOpen(false);
  }, [contract]);

  useEffect(() => {
    if (!contract || !address || !isUserRegistered || !isAllowedChainId) return;
    handleGetUserInfo(address);
  }, [isUserRegistered, contract]);

  useEffect(() => {
    if (!contract || !address || !isAllowedChainId) return;
    handleCheckUserExist(address);
  }, [contract]);

  useEffect(() => {
    if (!contract || !address || !isUserRegistered || !isAllowedChainId) return;
    handleGetUserContactList();
    setContactSelected(null);
  }, [isUserRegistered, contract]);

  useEffect(() => {
    if (
      !contract ||
      !address ||
      !isUserRegistered ||
      !isAllowedChainId ||
      !contactSelected
    )
      return;
    handleReadMessages();
    if (isUpdatingContactName) setIsUpdatingContactName(false);
  }, [contactSelected]);

  useEffect(() => {
    if (
      !contract ||
      !address ||
      !isUserRegistered ||
      !isAllowedChainId ||
      !contactSelected
    )
      return;
    setChat(calculateChat(messages));
  }, [messages]);

  useEffect(() => {
    if (
      !contract ||
      !address ||
      !isUserRegistered ||
      !isAllowedChainId ||
      !contactSelected
    )
      return;
    handleSetContactSelectedData();
  }, [contactSelected, contactList]);

  useEffect(() => {
    if (!signer || !address || !isAllowedChainId) return;

    const WasapContract = new ethers.Contract(
      wasapContractAddress[chainId],
      Wasap.abi,
      signer
    );

    setContract(WasapContract);
  }, [signer]);

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////  EVENTS  //////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const handleCreateAccountEvent = (user) => {
    if (getAddress(user) === getAddress(address)) {
      handleCheckUserExist(address);
      setIsCreatingAccount(false);
    }
  };

  const handleContactAddedEvent = (user) => {
    if (getAddress(user) === getAddress(address)) {
      handleGetUserContactList();
    }
  };

  const handleMessageSentEvent = (user, contact) => {
    const userAddress = getAddress(user);
    const contactAddress = getAddress(contact);
    if (
      getAddress(contactSelected) === userAddress &&
      getAddress(address) === contactAddress
    ) {
      // user is receiving message, so play notification
      handleReadMessages();
      playNotification();
    } else if (
      getAddress(address) === userAddress &&
      getAddress(contactSelected) === contactAddress
    ) {
      // user sent message and only update chat
      handleReadMessages();
    }
  };

  const handleUserInfoUpdatedEvent = (user) => {
    if (getAddress(address) === getAddress(user)) {
      handleGetUserInfo(address);
    }
  };

  const handleContactInfoUpdatedEvent = (user, contact) => {
    if (
      getAddress(address) === getAddress(user) &&
      getAddress(contactSelected) === getAddress(contact)
    ) {
      setIsUpdatingContactName(false);
      handleGetUserContactList();
    }
  };

  ////////////////////////  useEffect EVENTS  //////////////////////////
  // when contract is ready, subscribe to blockchain events

  useEffect(() => {
    if (!contract) return;
    contract.on("AccountCreated", handleCreateAccountEvent);
    return () => {
      contract.off("AccountCreated", handleCreateAccountEvent);
    };
  }, [contract]);

  useEffect(() => {
    if (!contract || !isUserRegistered) return;
    contract.on("ContactAdded", handleContactAddedEvent);
    contract.on("UserInfoUpdated", handleUserInfoUpdatedEvent);
    return () => {
      contract.off("ContactAdded", handleContactAddedEvent);
      contract.off("UserInfoUpdated", handleUserInfoUpdatedEvent);
    };
  }, [contract, isUserRegistered]);

  useEffect(() => {
    if (!contract || !contactSelected) return;
    contract.on("ContactInfoUpdated", handleContactInfoUpdatedEvent);
    contract.on("MessageSent", handleMessageSentEvent);
    return async () => {
      await setTimeout(() => {}, 0); // TODO: check this, without this line, sometimes do not subscribe to those events
      await contract.off("ContactInfoUpdated", handleContactInfoUpdatedEvent);
      await contract.off("MessageSent", handleMessageSentEvent);
    };
  }, [contactSelected]);

  return {
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
    isSendingMessage,
    isNewContactOpen,
    setIsNewContactOpen,
    isProfileOpen,
    setIsProfileOpen,
    contactSelected,
    handleSelectContact,
    checkUserExists,
    createAccount,
    addContact,
    sendMessage,
    getUserInfo,
    updateContactName,
    updateUserInfo,
  };
};

export default useWasap;
