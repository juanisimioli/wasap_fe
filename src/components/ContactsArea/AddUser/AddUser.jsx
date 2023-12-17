import { ContentPaste, Clear, ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Input from "@/components/Utils/Input/Input";
import { useStyles } from "./styles";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { getAddress, isAddress } from "ethers";
import { useWasapContext } from "@/contexts/useWasapContext";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { getUrlAvatar } from "@/utils/utils";

const AddUser = () => {
  const { classes } = useStyles();
  const [addressNewContact, setAddressNewContact] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isInputTouched, setIsInputTouched] = useState(false);

  const [nameNewContact, setNameNewContact] = useState("");
  const [avatarNewContact, setAvatarNewContact] = useState("");

  const [isContactRegistered, setIsContactRegistered] = useState(null);
  const [error, setError] = useState("");

  const {
    setIsAddContactOpened,
    addContact,
    checkUserExists,
    isLoadingCheckingUserExist,
    getUserInfo,
    isAddingContact,
  } = useWasapContext();
  const { wallet } = useMetamaskContext();
  const { address } = wallet;

  const handleAddressNewContact = ({ target }) => {
    const { value } = target;
    !isInputTouched && setIsInputTouched(true);
    setAddressNewContact(value);
    validateAddress();
  };

  const handleCloseAddContact = () => {
    setIsAddContactOpened(false);
    reset();
  };

  useEffect(() => {
    if (!isInputTouched) return;
    setError(isValidAddress || !addressNewContact ? "" : "Invalid address");
  }, [addressNewContact, isValidAddress]);

  const handleVerifyAddress = async () => {
    if (getAddress(addressNewContact) === getAddress(address)) {
      setError("Cannot add yourself");
      return;
    }

    const isExistUser = await checkUserExists(addressNewContact);
    if (!isExistUser) {
      setError("Contact is not registered");
      return;
    }

    const contactInfo = await getUserInfo(addressNewContact);
    setNameNewContact(contactInfo[0]);
    setAvatarNewContact(contactInfo[1]);
    setIsContactRegistered(true);
    console.log(contactInfo);
  };

  const handleNameNewContact = ({ target }) => {
    const { value } = target;
    setNameNewContact(value);
  };

  const handleAddContact = async () => {
    console.log("add contact ", addressNewContact, nameNewContact);
    try {
      const response = await addContact(addressNewContact, nameNewContact);
    } catch (e) {
      setError("Error. Try Again");
    }
  };

  const paste = async () => {
    if (isContactRegistered) return;
    const text = await navigator.clipboard.readText();
    !isInputTouched && setIsInputTouched(true);
    setAddressNewContact(text);
    validateAddress();
  };

  const clearAddress = () => {
    reset();
  };

  const validateAddress = () => {
    const isValid = isAddress(addressNewContact);
    setIsValidAddress(isValid);
  };

  const reset = () => {
    setAddressNewContact("");
    setNameNewContact("");
    setIsValidAddress(false);
    setIsContactRegistered(null);
    setError("");
  };

  useEffect(() => {
    validateAddress();
  }, [addressNewContact]);

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <ArrowBack
          className={classes.backIcon}
          onClick={handleCloseAddContact}
        />
        <p className={classes.title}>New contact</p>
      </div>

      <div className={classes.contentContainer}>
        <div className={classes.inputAddress}>
          <Input
            placeholder="Address"
            value={addressNewContact}
            onChange={handleAddressNewContact}
            disabled={isContactRegistered || isLoadingCheckingUserExist}
            width="100%"
            fontSize={12}
          />
          <div className={classes.icons}>
            <ContentPaste
              className={`${classes.pasteIcon} ${
                isContactRegistered ? classes.disabled : ""
              }`}
              onClick={paste}
            />
            <Clear className={classes.clearIcon} onClick={clearAddress} />
          </div>
        </div>

        <p className={classes.errorMessage}>{error}</p>

        {!isContactRegistered ? (
          <div className={classes.containerVerify}>
            <button
              className={classes.verifyButton}
              onClick={handleVerifyAddress}
              disabled={isLoadingCheckingUserExist || !isValidAddress}
            >
              Verify
            </button>
            {isLoadingCheckingUserExist && (
              <CircularProgress size={24} className={classes.loader} />
            )}
          </div>
        ) : (
          <>
            <div className={classes.nameNewContact}>
              <div className={classes.avatar}>
                <Image
                  src={getUrlAvatar(avatarNewContact)}
                  width={40}
                  height={40}
                  alt="avatar"
                  priority
                />
              </div>
              <Input
                placeholder="Name"
                value={nameNewContact}
                onChange={handleNameNewContact}
                width={282}
                fontSize={13}
                maxLength={25}
              />
            </div>

            <div className={classes.containerVerify}>
              <button
                className={classes.addContactButton}
                onClick={handleAddContact}
                disabled={isAddingContact}
              >
                {isAddingContact ? (
                  <CircularProgress size={20} className={classes.loader} />
                ) : (
                  "Add Contact"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddUser;
