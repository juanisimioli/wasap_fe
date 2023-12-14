import { ContentPaste, Clear, ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Input from "@/components/Utils/Input/Input";
import { useStyles } from "./styles";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { isAddress } from "ethers";

const AddUser = () => {
  const { classes } = useStyles();
  const [addressNewContact, setAddressNewContact] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isInputTouched, setIsInputTouched] = useState(false);

  const [nameNewContact, setNameNewContact] = useState("");
  const [avatarNewContact, setAvatarNewContact] = useState("");

  const [isContactRegistered, setIsContactRegistered] = useState(null);
  const [error, setError] = useState("");

  const handleAddressNewContact = ({ target }) => {
    const { value } = target;
    !isInputTouched && setIsInputTouched(true);
    setAddressNewContact(value);
    validateAddress();
  };

  useEffect(() => {
    if (!isInputTouched) return;
    setError(isValidAddress || !addressNewContact ? "" : "Invalid address");
  }, [addressNewContact, isValidAddress]);

  const handleVerifyAddress = () => {};

  const handleNameNewContact = () => {};

  const handleAddContact = () => {};

  const paste = async () => {
    const text = await navigator.clipboard.readText();
    !isInputTouched && setIsInputTouched(true);
    setAddressNewContact(text);
    validateAddress();
  };

  const clearAddress = () => {
    setAddressNewContact("");
  };

  const validateAddress = () => {
    const isValid = isAddress(addressNewContact);
    setIsValidAddress(isValid);
  };

  const reset = () => {
    setAddressNewContact("");
    setNameNewContact("");
    setAvatarNewContact("");
    setIsValidAddress(false);
    setIsContactRegistered(null);
    setError("");
  };

  useEffect(() => {
    validateAddress();
  }, [addressNewContact]);

  // Invalid address
  // Address not yet registered in our dApp
  // Error. Try again

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <ArrowBack className={classes.backIcon} />
        <p className={classes.title}>New contact</p>
      </div>

      <div className={classes.contentContainer}>
        <div className={classes.inputAddress}>
          <Input
            placeholder="Address"
            value={addressNewContact}
            onChange={handleAddressNewContact}
            disabled={false}
            width="100%"
            fontSize={12}
          />
          <div className={classes.icons}>
            <ContentPaste className={classes.pasteIcon} onClick={paste} />
            <Clear className={classes.clearIcon} onClick={clearAddress} />
          </div>
        </div>

        <p className={classes.errorMessage}>{error}</p>

        <div className={classes.containerVerify}>
          <button
            className={classes.verifyButton}
            onClick={handleVerifyAddress}
          >
            Verify
          </button>
          {true && <CircularProgress size={24} className={classes.loader} />}
        </div>

        <div className={classes.nameNewContact}>
          <div className={classes.avatar}>
            <Image
              src={"/default-user.svg"}
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
            disabled={false}
            width="79.5%"
            fontSize={13}
          />
        </div>

        <div className={classes.containerVerify}>
          <button className={classes.verifyButton} onClick={handleAddContact}>
            Add Contact
          </button>
          {true && <CircularProgress size={24} className={classes.loader} />}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
