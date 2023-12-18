"use client";
import { useState, useEffect } from "react";
import { ethers, getAddress } from "ethers";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import useProviderAndSigner from "./useProviderAndSigner";
import { calculateChat, JsDateToEpoch } from "@/utils/utils";
import { wasapContractAddress } from "../../config";
import { STATUS_MESSAGE } from "@/utils/utils";
import Wasap from "../../contract/Wasap.json";

const useWasap = () => {
  const { signer } = useProviderAndSigner();
  const {
    wallet: { address, chainId },
    isAllowedChainId,
  } = useMetamaskContext();

  const [contract, setContract] = useState(null);

  // USER INFORMATION
  const [isUserRegistered, setIsUserRegistered] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [contactList, setContactList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]);

  // USER SELECTION INFORMATION
  const [contactSelected, selectContact] = useState(null);
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
  const [isAddContactOpened, setIsAddContactOpened] = useState(false);
  const [isEditUserOpened, setIsEditUserOpened] = useState(false);

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ///////////////////////  getters  //////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const checkUserExists = async (address) => {
    try {
      return await contract.checkUserExists(address);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async (address) => {
    try {
      return await contract.getUserInfo(address);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserContactList = async () => {
    try {
      return await contract.getUserContactList();
    } catch (e) {
      console.log(e);
    }
  };

  const readMessages = async (contact) => {
    try {
      return await contract.readMessages(contact);
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
      setIsAddContactOpened(false);
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
      console.log(e);
    } finally {
      setIsUpdatingUserInfo(false);
      getUserInfo(address);
      setIsEditUserOpened(false);
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
      console.log(e);
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

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  /////////////////////  useEFFECTS  /////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    if (isAddContactOpened) setIsAddContactOpened(false);
  }, [address, chainId]);

  useEffect(() => {
    if (!contract || !address || !isUserRegistered || !isAllowedChainId) return;
    handleGetUserInfo(address);
  }, [isUserRegistered, address]);

  useEffect(() => {
    if (!contract || !address || !isAllowedChainId) return;
    handleCheckUserExist(address);
  }, [contract]);

  useEffect(() => {
    if (!contract || !address || !isUserRegistered || !isAllowedChainId) return;
    handleGetUserContactList();
    selectContact(null);
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
      (getAddress(address) === userAddress &&
        getAddress(contactSelected) === contactAddress) ||
      (getAddress(contactSelected) === userAddress &&
        getAddress(address) === contactAddress)
    )
      handleReadMessages();
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
    if (!contract || !isUserRegistered || !contactSelected) return;
    contract.on("ContactInfoUpdated", handleContactInfoUpdatedEvent);
    return () => {
      contract.off("ContactInfoUpdated", handleContactInfoUpdatedEvent);
    };
  }, [contactSelectedData]);

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
    if (!contract) return;
    contract.on("MessageSent", handleMessageSentEvent);
    return () => {
      contract.off("MessageSent", handleMessageSentEvent);
    };
  }, [contactSelectedData]);

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
    isAddContactOpened,
    setIsAddContactOpened,
    isEditUserOpened,
    setIsEditUserOpened,
    contactSelected,
    selectContact,
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
