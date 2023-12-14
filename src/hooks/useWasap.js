"use client";
import { useState, useEffect } from "react";
import { calculateChat } from "@/utils/utils";
import { mockedMessages } from "@/mocked";
import useProviderAndSigner from "./useProviderAndSigner";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { wasapContractAddress } from "../../config";
import { ethers, getAddress } from "ethers";
import Wasap from "../../../wasap-be/artifacts/contracts/Wasap.sol/Wasap.json";

const useWasap = () => {
  const { signer } = useProviderAndSigner();
  const {
    wallet: { address, chainId },
    isAllowedChainId,
  } = useMetamaskContext();

  const [contract, setContract] = useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [contactSelected, selectContact] = useState(null);
  const [contactSelectedData, setContactSelectedData] = useState({
    name: "",
    avatar: "",
  });

  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]);

  const [contactList, setContactList] = useState([]);

  const [isLoadingChats, setIsLoadingChats] = useState(null);
  const [isSendingMessage, setIsSendingMessage] = useState(null);

  const checkUserExists = async () => {
    try {
      const isUserExist = await contract.checkUserExists(address);
      setIsUserRegistered(isUserExist);
    } catch (e) {
      console.log(e);
    }
  };

  const createAccount = async (_name, _avatar, onError) => {
    try {
      const createAccount = await contract.createAccount(_name, _avatar);
      createAccount.wait();
    } catch (e) {
      console.log(e);
      // onError(e);
    }
  };

  const readMessages = async () => {
    console.log("READING MESSAGES", { contactSelected, address });
    try {
      const readMessages = await contract.readMessages(contactSelected);
      setMessages(readMessages);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (contactSelected, text) => {
    setIsSendingMessage(true);
    try {
      const messageSent = await contract.sendMessage(
        getAddress(contactSelected),
        text
      );
      console.log(messageSent);
      // messageSent.wait();
    } catch (e) {
      console.log(e);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const getUserContactList = async () => {
    try {
      const contactList = await contract.getUserFriendList();
      setContactList(contactList);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async () => {
    try {
      const userInfo = await contract.getUserInfo(address);
      setUserInfo({ name: userInfo[0], avatar: userInfo[1] });
    } catch (e) {
      console.log(e);
    }
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
    setChat(calculateChat(messages));
  }, [messages, address, chainId]);

  useEffect(() => {
    if (
      !contract ||
      !address ||
      !isUserRegistered ||
      !isAllowedChainId ||
      !contactSelected
    )
      return;
    readMessages();
  }, [isUserRegistered, address, contract, chainId, contactSelected]);

  useEffect(() => {
    if (!contract || !address || !isUserRegistered || !isAllowedChainId) return;
    getUserContactList();
    selectContact(null);
  }, [isUserRegistered, address, contract, chainId]);

  useEffect(() => {
    if (!contract || !address || !isAllowedChainId) return;
    checkUserExists(address);
  }, [address, chainId, contract]);

  useEffect(() => {
    if (!contract || !address || !isUserRegistered || !isAllowedChainId) return;
    getUserInfo();
  }, [address, chainId, contract, isUserRegistered]);

  useEffect(() => {
    if (
      !contract ||
      !address ||
      !isUserRegistered ||
      !isAllowedChainId ||
      !contactSelected
    )
      return;
    const contactData = contactList.find(
      (contact) => contact.addressUser === contactSelected
    );

    setContactSelectedData({
      name: contactData.name,
      avatar: contactData.avatar,
    });
  }, [contactSelected]);

  useEffect(() => {
    if (!signer || !address || !isAllowedChainId) return;

    const WasapContract = new ethers.Contract(
      wasapContractAddress[chainId],
      Wasap.abi,
      signer
    );

    setContract(WasapContract);
  }, [signer, address, chainId]);

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////  EVENTS  //////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  const handleCreateAccountEvent = (userAddress) => {
    if (getAddress(userAddress) !== getAddress(address)) return;
    console.log(`Account created for user ${userAddress}`);
  };

  const handleMessageSentEvent = (senderAddress, receiverAddress) => {
    console.log("EVENT MESSAGE SENT", {
      senderAddress,
      receiverAddress,
      address,
      contactSelected,
      condition:
        (getAddress(address) === getAddress(senderAddress) &&
          getAddress(contactSelected) === getAddress(receiverAddress)) ||
        (getAddress(contactSelected) === getAddress(senderAddress) &&
          getAddress(address) === getAddress(receiverAddress)),
    });
    if (
      (getAddress(address) === getAddress(senderAddress) &&
        getAddress(contactSelected) === getAddress(receiverAddress)) ||
      (getAddress(contactSelected) === getAddress(senderAddress) &&
        getAddress(address) === getAddress(receiverAddress))
    )
      readMessages();
  };

  // when contract is ready, subscribe to blockchain events
  useEffect(() => {
    if (!contract) return;

    console.log("subscribing contracts");
    contract.on("AccountCreated", handleCreateAccountEvent);
    contract.on("MessageSent", handleMessageSentEvent);
    return () => {
      contract.off("AccountCreated", handleCreateAccountEvent);
      contract.off("MessageSent", handleMessageSentEvent);
    };
  }, [contract]);

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
  };
};

export default useWasap;
