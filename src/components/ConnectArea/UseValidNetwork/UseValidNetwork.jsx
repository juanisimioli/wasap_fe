import { useStyles } from "./styles";
import Image from "next/image";

const UseValidNetwork = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        Wasap <Image src="/wasap-3-logo.png" width={35} height={35} />
      </h1>
      <p className={classes.text}>Please connect to Sepolia testnet</p>
    </div>
  );
};

export default UseValidNetwork;
