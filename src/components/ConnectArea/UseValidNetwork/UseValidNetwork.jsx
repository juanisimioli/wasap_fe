import Image from "next/image";
import FooterInfo from "../FooterInfo/FooterInfo";
import { useStyles } from "./styles";

const UseValidNetwork = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        Wasap{" "}
        <Image
          src="/wasap-3-logo.png"
          width={35}
          height={35}
          alt="wasap logo"
          priority
        />
      </h1>
      <p className={classes.text}>Please connect to Sepolia testnet</p>
      <FooterInfo />
    </div>
  );
};

export default UseValidNetwork;
