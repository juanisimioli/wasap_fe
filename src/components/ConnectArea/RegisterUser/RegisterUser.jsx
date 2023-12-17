"use client";
import { useEffect, useState } from "react";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useStyles } from "./styles";
import Input from "@/components/Utils/Input/Input";
import AvatarEdit from "@/components/Utils/AvatarEdit/AvatarEdit";
import Image from "next/image";
import FooterInfo from "../FooterInfo/FooterInfo";
import { uploadFileToIpfs } from "@/utils/ipfs";
import { useWasapContext } from "@/contexts/useWasapContext";
import { CircularProgress } from "@mui/material";

const RegisterUser = () => {
  const [isUploading, seIsUploading] = useState(false);
  const { classes } = useStyles();
  const { wallet } = useMetamaskContext();
  const { address, balance } = wallet;
  const [isZeroBalance, setIsZeroBalance] = useState(false);
  // cid => content identifier IPFS
  const [cid, setCid] = useState("");
  const [name, setName] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState("");

  const { createAccount, isCreatingAccount } = useWasapContext();

  const uploadFile = async (file) => {
    setError("");
    seIsUploading(true);
    if (file?.size > 205000) setError("Image must be lower than 200kb");

    try {
      const ipfsHash = await uploadFileToIpfs(file);
      setCid(ipfsHash);
    } catch (e) {
      console.log(e);
      setError("Cannot update image");
    } finally {
      seIsUploading(false);
    }
  };

  const registerUser = async (name, cid, address) => {
    await createAccount(name, cid, setError);
  };

  const handleChangeName = ({ target }) => {
    const { value } = target;
    setError(value.length === 0 ? "You must provide a name" : "");
    setName(value);
  };

  const handleRegisterUser = () => {
    if (!isTouched) setIsTouched(true);
    registerUser(name, cid, address);
  };

  const showRegisterButton = !error && name.length !== 0 && !isZeroBalance;

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
        cid={cid}
        onEditAvatar={uploadFile}
      />

      <div>
        <Input
          value={name}
          onChange={handleChangeName}
          placeholder="Your name"
          maxLength={25}
          width={250}
        />
        <p className={classes.error}>{error}</p>
      </div>

      {showRegisterButton && (
        <button
          className={classes.button}
          disabled={!showRegisterButton || isCreatingAccount}
          onClick={handleRegisterUser}
        >
          {isCreatingAccount ? (
            <CircularProgress size={24} className={classes.loader} />
          ) : (
            "Register"
          )}
        </button>
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
