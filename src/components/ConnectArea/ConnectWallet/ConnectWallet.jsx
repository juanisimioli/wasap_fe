import { useStyles } from "./styles";
import Image from "next/image";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import FooterInfo from "../FooterInfo/FooterInfo";

const ConnectWallet = () => {
  const { classes } = useStyles();

  const { connectMetaMask } = useMetamaskContext();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        Wasap <Image src="/wasap-3-logo.png" width={35} height={35} />
      </h1>
      <button onClick={connectMetaMask} className={classes.button}>
        <Image
          width={30}
          height={30}
          src="/metamask-icon.svg"
          alt="metamask icon"
        />
        Connect
      </button>
      <p className={classes.text}>Connect your wallet</p>
      <FooterInfo />
    </div>
  );
};

export default ConnectWallet;
