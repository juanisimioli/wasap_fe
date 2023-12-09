"use client";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useStyles } from "./styles";
import Image from "next/image";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const RegisterUser = () => {
  const { classes } = useStyles();
  const { wallet } = useMetamaskContext();
  const { address, balance } = wallet;

  // example image hash uploaded
  const avatar = "QmT9RRYnUsEdjwtqKGtDCscHK6XGC8xS6jJfp4iw36doM5";

  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (e) => {
    setUploading(true);
    e.preventDefault();

    if (!file) return;

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
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div>Register</div>
      <p>
        Your current balance is 0 ETH. You can use this{" "}
        <a target="_blank" href="https://sepoliafaucet.com/">
          faucet
        </a>{" "}
        to obtain some free ETH
        {balance}
      </p>

      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="upload" />
      </form>

      <p>{address}</p>
      <p>
        Image will be uploaded on IPFS (InterPlanetary File System) and will
        remain there for the rest of your life.
        https://docs.ipfs.tech/concepts/what-is-ipfs/
      </p>
      <input placeholder="name" />

      {uploading && <CircularProgress size={24} className={classes.loader} />}

      {cid && (
        <div className={classes.avatar}>
          <Image
            src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_TOKEN}`}
            width={40}
            height={40}
            alt="avatar"
          />
        </div>
      )}
      <button>Register</button>
    </div>
  );
};

export default RegisterUser;
