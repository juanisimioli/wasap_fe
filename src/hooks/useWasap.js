"use client";
import { useState, useEffect } from "react";
import { calculateChat } from "@/utils/utils";
import useProviderAndSigner from "./useProviderAndSigner";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { wasapContractAddress } from "../../config";
import { ethers, getAddress } from "ethers";
import Wasap from "../../../wasap-backend/artifacts/contracts/Wasap.sol/Wasap.json";
import { JsDateToEpoch } from "@/utils/utils";

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
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]);
  const [contactList, setContactList] = useState([]);

  // USER SELECTION INFORMATION
  const [contactSelected, selectContact] = useState(null);
  const [contactSelectedData, setContactSelectedData] = useState({
    name: "",
    avatar: "",
  });

  // LOADER flags
  const [isLoadingCheckingUserExist, setIsLoadingCheckingUserExist] =
    useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(false);

  // POST flags
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(null);
  const [isAddingContact, setIsAddingContact] = useState(null);
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
      const response = await contract.checkUserExists(address);
      console.log({ response });
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async (address) => {
    console.log("---> getUserInfo", address);
    try {
      const response = await contract.getUserInfo(address);
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const getUserContactList = async () => {
    console.log("---> getUserContactList", address);
    try {
      const contactList = await contract.getUserContactList();
      setContactList(contactList);
    } catch (e) {
      console.log(e);
    }
  };

  const readMessages = async () => {
    try {
      console.log("---> reading messages", { address, contactSelected });
      const readMessages = await contract.readMessages(contactSelected);
      setMessages(readMessages);
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
    console.log("---> createAccount", address);
    setIsCreatingAccount(true);
    try {
      const createAccount = await contract.createAccount(_name, _avatar);
      createAccount.wait();
    } catch (e) {
      console.log(e);
    }
  };

  const addContact = async (addressContact, contactName) => {
    console.log("---> addContact", address);
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

  const updateMessageStatusToSending = (timestamp, text) => {
    setMessages((prev) => [
      ...prev,
      {
        text,
        status: 0,
        sender: getAddress(address),
        timestamp,
      },
    ]);
  };

  const updateMessageStatusToSent = (timestamp) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.timestamp === timestamp ? { ...message, status: 1 } : message
      )
    );
  };

  const sendMessage = async (contactSelected, text) => {
    console.log("---> sendMessage", address);
    const timestamp = JsDateToEpoch();
    updateMessageStatusToSending(timestamp, text);
    setIsSendingMessage(true);
    try {
      const messageSent = await contract.sendMessage(contactSelected, text);
      console.log("***AAAAAA***", messageSent);
      updateMessageStatusToSent(timestamp);
      messageSent.wait();
      console.log("***BBBB***", messageSent);
    } catch (e) {
      console.log("Message Sent", { e });
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
      getUserInfo();
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
      console.log("updating");
      update.wait();
    } catch (e) {
      console.log(e);
    } finally {
      // TODO: think how to reload contact name
    }
  };

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  //////////////////////  handlers  //////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const handleCheckUserExist = async () => {
    console.log("---> checkUserExist", address);
    setIsLoadingCheckingUserExist(true);
    const response = await checkUserExists(address);
    setIsUserRegistered(response);
    setIsLoadingCheckingUserExist(false);
  };

  const handleGetUserInfo = async () => {
    console.log("---> getUserInfo", address);
    try {
      const userInfo = await getUserInfo(address);
      setUserInfo({ name: userInfo[0], avatar: userInfo[1] });
    } catch (e) {
      console.log(e);
    }
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
    console.log("getUserInfo");
    handleGetUserInfo();
  }, [contract, isUserRegistered]);

  useEffect(() => {
    if (!contract || !address || !isAllowedChainId) return;
    console.log("checkUserExists");
    handleCheckUserExist(address);
  }, [contract]);

  useEffect(() => {
    if (!contract || !address || !isUserRegistered || !isAllowedChainId) return;
    console.log("getUserContactList, selectContact");
    getUserContactList();
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
    console.log("readMessages");
    readMessages();
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
    console.log("setChat");
    setChat(calculateChat(messages));
  }, [messages]);

  const handleSetContactSelectedData = () => {
    const contactData = contactList.find(
      (contact) => contact.contactAddress === contactSelected
    );

    setContactSelectedData({
      name: contactData.name,
      avatar: contactData.avatar,
    });
  };

  useEffect(() => {
    if (
      !contract ||
      !address ||
      !isUserRegistered ||
      !isAllowedChainId ||
      !contactSelected
    )
      return;
    console.log("setContactSelectedData");
    handleSetContactSelectedData();
  }, [contactSelected, contactList]);

  useEffect(() => {
    if (!signer || !address || !isAllowedChainId) return;
    console.log("*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/* setContract");

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

  const handleCreateAccountEvent = (userAddress) => {
    console.log(`Account created for user ${userAddress}`, address);
    if (getAddress(userAddress) !== getAddress(address)) return;
    handleCheckUserExist();
    setIsCreatingAccount(false);
  };

  const handleContactAddedEvent = (userAddress) => {
    console.log("EVENT CONTACT ADDED");
    if (getAddress(userAddress) !== getAddress(address)) return;
    getUserContactList();
  };

  const handleMessageSentEvent = (senderAddress, receiverAddress) => {
    console.log(
      "EVENT MESSAGE SENT",
      { contactSelected },
      (getAddress(address) === getAddress(senderAddress) &&
        getAddress(contactSelected) === getAddress(receiverAddress)) ||
        (getAddress(contactSelected) === getAddress(senderAddress) &&
          getAddress(address) === getAddress(receiverAddress))
    );
    if (
      (getAddress(address) === getAddress(senderAddress) &&
        getAddress(contactSelected) === getAddress(receiverAddress)) ||
      (getAddress(contactSelected) === getAddress(senderAddress) &&
        getAddress(address) === getAddress(receiverAddress))
    )
      readMessages();
  };

  const handleUserInfoUpdatedEvent = (userAddress) => {
    console.log("EVENT UPDATED USER INFO");
    if (getAddress(address) === getAddress(userAddress)) {
      handleGetUserInfo();
    }
  };

  const handleContactInfoUpdatedEvent = (userAddress, contactAddress) => {
    console.log("EVENT UPDATE CONTACT INFO", userAddress, contactAddress);
    // TODO: this inside IF
    setIsUpdatingContactName(false);
    getUserContactList();
    // handleSetContactSelectedData();
  };

  // when contract is ready, subscribe to blockchain events
  useEffect(() => {
    if (!contract) return;
    contract.on("AccountCreated", handleCreateAccountEvent);
    contract.on("ContactAdded", handleContactAddedEvent);
    contract.on("UserInfoUpdated", handleUserInfoUpdatedEvent);
    contract.on("ContactInfoUpdated", handleContactInfoUpdatedEvent);

    return () => {
      contract.off("AccountCreated", handleCreateAccountEvent);
      contract.off("ContactAdded", handleContactAddedEvent);
      contract.off("UserInfoUpdated", handleUserInfoUpdatedEvent);
      contract.on("ContactInfoUpdated", handleContactInfoUpdatedEvent);
    };
  }, [contract]);

  // when contract is ready, subscribe to blockchain events
  useEffect(() => {
    if (!contract) return;
    console.log("***** SUBSCRIBING contracts message sent", contactSelected);
    contract.on("MessageSent", handleMessageSentEvent);
    return () => {
      console.log("***** REMOVING contracts message sent", contactSelected);
      contract.off("MessageSent", handleMessageSentEvent);
    };
  }, [contract, contactSelected]);

  return {
    chat,
    createAccount,
    isUserRegistered,
    selectContact,
    contactSelected,
    contactSelectedData,
    contactList,
    isSendingMessage,
    sendMessage,
    userInfo,
    addContact,
    isAddingContact,
    isAddContactOpened,
    setIsAddContactOpened,
    isCreatingAccount,
    isLoadingCheckingUserExist,
    checkUserExists,
    getUserInfo,
    isEditUserOpened,
    setIsEditUserOpened,
    updateUserInfo,
    isUpdatingUserInfo,
    isUpdatingContactName,
    updateContactName,
  };
};

export default useWasap;
