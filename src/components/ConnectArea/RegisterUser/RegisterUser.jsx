"use client";
import { useEffect, useState } from "react";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useStyles } from "./styles";
import Input from "@/components/Utils/Input/Input";
import AvatarEdit from "@/components/Utils/AvatarEdit/AvatarEdit";

const RegisterUser = () => {
  const [isUploading, seIisUploading] = useState(false);
  const { classes } = useStyles({ isUploading });
  const { wallet } = useMetamaskContext();
  const { address, balance } = wallet;
  const [isZeroBalance, setIsZeroBalance] = useState(false);
  // cid => content identifier IPFS
  const [cid, setCid] = useState("");
  const [name, setName] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file) => {
    setError("");
    seIisUploading(true);
    if (!file) return;
    if (file?.size > 205000) setError("Image must be lower than 200kb");

    try {
      const data = new FormData();
      data.set("file", file), { filename: file.name };

      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });

      const responseData = await res.json();

      setCid(responseData.ipfsHash);

      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      // TODO: handle this
      console.error(e);
    } finally {
      seIisUploading(false);
    }
  };

  const registerUser = (name, cid, address) => {
    console.log("REGISTER USER", { name, cid, address });
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

  useEffect(() => {
    setIsZeroBalance(Number(balance) === 0);
  }, [balance]);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Register</h1>

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

      {isZeroBalance && (
        <p className={classes.errorZeroTokens}>
          Your current balance is 0.
          <br />
          <a target="_blank" href="https://sepoliafaucet.com/">
            Click HERE to obtain free tokens
          </a>
        </p>
      )}

      <button
        className={classes.button}
        disabled={error || name.length === 0 || isZeroBalance}
        onClick={handleRegisterUser}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterUser;
