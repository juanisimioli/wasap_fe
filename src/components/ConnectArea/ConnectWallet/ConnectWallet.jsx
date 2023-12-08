import { useStyles } from "./styles";
import Image from "next/image";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";

const ConnectWallet = () => {
  const { classes } = useStyles();

  const { connectMetaMask } = useMetamaskContext();

  return (
    <div className={classes.container}>
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
    </div>
  );
};

export default ConnectWallet;
