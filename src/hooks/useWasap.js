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
import { PAYMENTS_ENABLED } from "../../config";

const useWasap = () => {
  const { signer } = useProviderAndSigner();
  const {
    wallet: { address, chainId },
    isAllowedChainId,
    updateBalance,
  } = useMetamaskContext();

  const { handleOpenToast } = useToast();

  const [contract, setContract] = useState(null);

  // USER INFORMATION
  const [isUserRegistered, setIsUserRegistered] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [contactList, setContactList] = useState([]);
  const [texts, setTexts] = useState([]);
  const [payments, setPayments] = useState([]);
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
  const [isSendingText, setIsSendingText] = useState(false);
  const [isSendingPayment, setIsSendingPayment] = useState(false);
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

  const readTexts = async (contact) => {
    try {
      return await contract.readTexts(contact);
    } catch (e) {
      handleOpenToast("error", "Problem reading text messages");
      console.error(e);
    }
  };

  const readPayments = async (contact) => {
    if (!PAYMENTS_ENABLED) return;
    try {
      return await contract.readPayments(contact);
    } catch (e) {
      handleOpenToast("error", "Problem reading payments");
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
      if (e?.info?.error?.code === 4001) {
        handleOpenToast("error", "Transaction rejected");
      } else {
        handleOpenToast("error", "Problem creating account");
        console.error(e);
      }

      setIsCreatingAccount(false);
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
      if (e?.info?.error?.code === 4001) {
        handleOpenToast("error", "Transaction rejected");
      } else {
        handleOpenToast("error", "Problem adding contact");
        console.error(e);
      }
    } finally {
      setIsAddingContact(false);
    }
  };

  const sendText = async (contactSelected, text) => {
    const timestamp = JsDateToEpoch() + 59;
    updateTextStatusToSending(timestamp, text);
    setIsSendingText(true);
    try {
      const textSent = await contract.sendText(contactSelected, text);
      updateTextStatusToSent(timestamp);
      textSent.wait();
    } catch (e) {
      if (e?.info?.error?.code === 4001) {
        handleOpenToast("error", "Transaction rejected");
        updateTextStatusToRejected(timestamp);
      } else {
        handleOpenToast("error", "Problem sending text message");
        console.error(e);
      }
    } finally {
      setIsSendingText(false);
    }
  };

  const resendText = (contactSelected, text) => {
    setTexts((prev) =>
      prev.filter((text) => text.status !== STATUS_MESSAGE.Rejected)
    );
    sendText(contactSelected, text);
  };

  const sendPayment = async (contactSelected, amount) => {
    if (!PAYMENTS_ENABLED) return;
    const timestamp = JsDateToEpoch() + 59;
    updatePaymentStatusToSending(timestamp, amount);
    setIsSendingPayment(true);

    try {
      const paymentSent = await contract.sendPayment(contactSelected, {
        value: amount,
      });
      updatePaymentStatusToSent(timestamp);
      paymentSent.wait();
    } catch (e) {
      if (e?.info?.error?.code === 4001) {
        handleOpenToast("error", "Transaction rejected");
        updatePaymentStatusToRejected(timestamp);
      } else {
        handleOpenToast("error", "Problem sending payment");
        console.error(e);
      }
    } finally {
      setIsSendingPayment(false);
    }
  };

  const resendPayment = (contactSelected, amount) => {
    setPayments((prev) =>
      prev.filter((payment) => payment.status !== STATUS_MESSAGE.Rejected)
    );
    sendPayment(contactSelected, amount);
  };

  const updateUserInfo = async (_userAvatar, _userName) => {
    setIsUpdatingUserInfo(true);
    try {
      const update = await contract.updateUserInfo(_userAvatar, _userName);
      update.wait();
    } catch (e) {
      if (e?.info?.error?.code === 4001) {
        handleOpenToast("error", "Transaction rejected");
      } else {
        handleOpenToast("error", "Problem updating user info");
        console.error(e);
      }
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
      if (e?.info?.error?.code === 4001) {
        handleOpenToast("error", "Transaction rejected");
      } else {
        handleOpenToast("error", "Problem updating contact info");
        console.error(e);
      }
    }
  };

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  //////////////////////  handlers  //////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  const handleCheckUserExistAndUserInfo = async (address) => {
    if (!address) return;
    setIsLoadingCheckingUserExist(true);
    const isRegistered = await checkUserExists(address);
    setIsUserRegistered(isRegistered);
    setIsLoadingCheckingUserExist(false);
    if (isRegistered) {
      const userInfo = await getUserInfo(address);
      if (!userInfo) return;
      setUserInfo(userInfo);
    }
  };

  const handleGetUserInfo = async (address) => {
    if (!isUserRegistered) return;
    const userInfo = await getUserInfo(address);
    if (!userInfo) return;
    setUserInfo(userInfo);
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

  const handleReadTexts = async () => {
    if (!contactSelected) return;
    const texts = await readTexts(contactSelected);

    // When receiving text messages, check if sender have text messages that are in status "sending" or "sent" (waiting event from blockchain) and leave those messages on chat.
    // Validation is made with "text" from last 5 messages sent, I know is not the way to do it, but it's ok for this MVP.
    setTexts((prev) => {
      const pendingTexts = prev.filter(
        (text) =>
          (text.status === STATUS_MESSAGE.Sending ||
            text.status === STATUS_MESSAGE.Sent) &&
          !texts
            ?.map((msg) => msg.text)
            .slice(-5)
            .includes(text.text)
      );

      return [...texts, ...pendingTexts];
    });
  };

  const handleReadPayments = async () => {
    if (!contactSelected) return;
    const payments = await readPayments(contactSelected);

    if (!payments) return;

    // When receiving messages, check if sender have messages that are in status "sending" or "sent" (waiting event from blockchain) and leave those messages on chat.
    // Validation is made with "text" from last 5 messages sent, I know is not the way to do it, but it's ok for this MVP.
    setPayments((prev) => {
      const pendingPayments = prev.filter(
        (payment) =>
          (payment.status === STATUS_MESSAGE.Sending ||
            payment.status === STATUS_MESSAGE.Sent) &&
          !payments
            ?.map((msg) => msg.text)
            .slice(-5)
            .includes(payment.text)
      );

      return [...payments, ...pendingPayments];
    });
  };

  const handleGetUserContactList = async () => {
    const contactList = await getUserContactList();
    setContactList(contactList);
  };

  const updateTextStatusToSending = (timestamp, text) => {
    setTexts((prev) => [
      ...prev,
      {
        text,
        status: STATUS_MESSAGE.Sending,
        sender: getAddress(address),
        timestamp,
      },
    ]);
  };

  const updateTextStatusToSent = (timestamp) => {
    setTexts((prev) =>
      prev.map((text) =>
        text.timestamp === timestamp
          ? { ...text, status: STATUS_MESSAGE.Sent }
          : text
      )
    );
  };

  const updateTextStatusToRejected = (timestamp) => {
    setTexts((prev) =>
      prev.map((text) =>
        text.timestamp === timestamp
          ? { ...text, status: STATUS_MESSAGE.Rejected }
          : text
      )
    );
  };

  const updatePaymentStatusToSending = (timestamp, amount) => {
    setPayments((prev) => [
      ...prev,
      {
        amount,
        status: STATUS_MESSAGE.Sending,
        sender: getAddress(address),
        timestamp,
      },
    ]);
  };

  const updatePaymentStatusToSent = (timestamp) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.timestamp === timestamp
          ? { ...payment, status: STATUS_MESSAGE.Sent }
          : payment
      )
    );
  };

  const updatePaymentStatusToRejected = (timestamp) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.timestamp === timestamp
          ? { ...payment, status: STATUS_MESSAGE.Rejected }
          : payment
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
    if (!contract || !address || !isAllowedChainId) return;
    handleCheckUserExistAndUserInfo(address);
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
    handleReadTexts();
    handleReadPayments();
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
    setChat(calculateChat([...texts, ...payments]));
  }, [texts, payments]);

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
      handleCheckUserExistAndUserInfo(address);
      setIsCreatingAccount(false);
    }
  };

  const handleContactAddedEvent = (user) => {
    if (getAddress(user) === getAddress(address)) {
      handleGetUserContactList();
    }
  };

  const handleTextSentEvent = (user, contact) => {
    const userAddress = getAddress(user);
    const contactAddress = getAddress(contact);
    if (
      getAddress(contactSelected) === userAddress &&
      getAddress(address) === contactAddress
    ) {
      // user is receiving text message, so play notification
      handleReadTexts();
      playNotification();
    } else if (
      getAddress(address) === userAddress &&
      getAddress(contactSelected) === contactAddress
    ) {
      // user sent text message and only update chat
      handleReadTexts();
    }
  };

  const handlePaymentSentEvent = (user, contact) => {
    const userAddress = getAddress(user);
    const contactAddress = getAddress(contact);
    if (
      getAddress(contactSelected) === userAddress &&
      getAddress(address) === contactAddress
    ) {
      // user is receiving message, so play notification
      handleReadPayments();
      playNotification();
    } else if (
      getAddress(address) === userAddress &&
      getAddress(contactSelected) === contactAddress
    ) {
      // user sent message and only update chat
      handleReadPayments();
    }
    updateBalance();
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
    contract.on("TextSent", handleTextSentEvent);
    contract.on("PaymentSent", handlePaymentSentEvent);
    return async () => {
      await setTimeout(() => {}, 0); // TODO: check this, without this line, sometimes do not subscribe to those events
      await contract.off("ContactInfoUpdated", handleContactInfoUpdatedEvent);
      await contract.off("TextSent", handleTextSentEvent);
      await contract.off("PaymentSent", handlePaymentSentEvent);
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
};

export default useWasap;
