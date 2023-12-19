import { useEffect, useState } from "react";
import { getAddress, isAddress } from "ethers";
import Image from "next/image";
import { ContentPaste, Clear, ArrowBack } from "@mui/icons-material";
import { useWasapContext } from "@/contexts/useWasapContext";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import Input from "@/components/Utils/Input/Input";
import ButtonWithLoader from "@/components/Utils/ButtonWithLoader/ButtonWithLoader";
import { getUrlAvatar } from "@/utils/utils";
import { useStyles } from "./styles";

const NewContact = () => {
  const { classes } = useStyles();
  const [addressNewContact, setAddressNewContact] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isInputTouched, setIsInputTouched] = useState(false);

  const [nameNewContact, setNameNewContact] = useState("");
  const [avatarNewContact, setAvatarNewContact] = useState("");

  const [isContactRegistered, setIsContactRegistered] = useState(null);
  const [error, setError] = useState("");

  const {
    setIsNewContactOpen,
    addContact,
    checkUserExists,
    isLoadingCheckingUserExist,
    getUserInfo,
    isAddingContact,
    contactList,
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
    setIsNewContactOpen(false);
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

    const alreadyContacts = Boolean(
      contactList.find(
        (contact) => contact.contactAddress === addressNewContact
      )
    );

    if (alreadyContacts) {
      setError("Contact is in your contact List");
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
  };

  const handleNameNewContact = ({ target }) => {
    const { value } = target;
    setNameNewContact(value);
  };

  const handleAddContact = async () => {
    try {
      await addContact(addressNewContact, nameNewContact);
    } catch (e) {
      setError("Error. Try Again");
      console.error(e);
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
            <ButtonWithLoader
              isLoading={isLoadingCheckingUserExist}
              title="Verify"
              onClick={handleVerifyAddress}
              disabled={!isValidAddress}
            />
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
              <ButtonWithLoader
                isLoading={isAddingContact}
                title="Add Contact"
                onClick={handleAddContact}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewContact;
