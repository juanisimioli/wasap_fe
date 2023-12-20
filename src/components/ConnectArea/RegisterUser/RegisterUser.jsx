"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useWasapContext } from "@/contexts/useWasapContext";
import Input from "@/components/Utils/Input/Input";
import ButtonWithLoader from "@/components/Utils/ButtonWithLoader/ButtonWithLoader";
import AvatarEdit from "@/components/Utils/AvatarEdit/AvatarEdit";
import FooterInfo from "../FooterInfo/FooterInfo";
import { uploadFileToIpfs } from "@/utils/ipfs";
import { useStyles } from "./styles";

const RegisterUser = () => {
  const [isUploading, seIsUploading] = useState(false);
  const { classes } = useStyles();
  const { wallet } = useMetamaskContext();
  const { address, balance } = wallet;
  const [isZeroBalance, setIsZeroBalance] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState("");

  const { createAccount, isCreatingAccount } = useWasapContext();

  const canRegister = !error && name.length !== 0 && !isZeroBalance;

  const uploadFile = async (file) => {
    setError("");
    seIsUploading(true);

    try {
      const ipfsHash = await uploadFileToIpfs(file, setError);
      setAvatar(ipfsHash);
    } catch (e) {
      setError("Cannot update image");
      console.error(e);
    } finally {
      seIsUploading(false);
    }
  };

  const registerUser = async (name, avatar) => {
    await createAccount(name, avatar);
  };

  const handleChangeName = ({ target }) => {
    const { value } = target;
    setError(value.length === 0 ? "You must provide a name" : "");
    setName(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRegisterUser();
    }
  };

  const handleRegisterUser = () => {
    if (!canRegister) return;
    if (!isTouched) setIsTouched(true);
    registerUser(name, avatar);
  };

  useEffect(() => {
    setIsZeroBalance(Number(balance) === 0);
  }, [balance]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        Register Wasap{" "}
        <Image
          src="/wasap-3-logo.png"
          width={35}
          height={35}
          alt="wasap logo"
          priority
        />
      </h1>

      <p className={classes.address}>{address}</p>

      <AvatarEdit
        isUploading={isUploading}
        avatar={avatar}
        onEditAvatar={uploadFile}
      />

      <div>
        <Input
          value={name}
          onChange={handleChangeName}
          onKeyDown={handleKeyDown}
          placeholder="Your name"
          maxLength={25}
          width={250}
        />
        <p className={classes.error}>{error}</p>
      </div>

      {canRegister && (
        <ButtonWithLoader
          title="Register"
          isLoading={isCreatingAccount}
          onClick={handleRegisterUser}
          disabled={!canRegister || isUploading}
        />
      )}

      {isZeroBalance && (
        <p className={classes.errorZeroTokens}>
          Your current balance is 0.
          <br />
          <a target="_blank" href="https://sepoliafaucet.com/">
            Click HERE to obtain free tokens
          </a>
        </p>
      )}

      <FooterInfo />
    </div>
  );
};

export default RegisterUser;
