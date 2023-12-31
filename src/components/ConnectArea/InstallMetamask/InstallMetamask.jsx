import { useStyles } from "./styles";
import Image from "next/image";
import Link from "next/link";
import FooterInfo from "../FooterInfo/FooterInfo";

const InstallMetamask = () => {
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
        />
      </h1>
      <Link
        className={classes.button}
        target="_blank"
        href="https://metamask.io/"
      >
        <Image
          width={30}
          height={30}
          src="/metamask-icon.svg"
          alt="metamask icon"
        />
        Install
      </Link>
      <p className={classes.text}>Metamask extension must be installed</p>
      <FooterInfo />
    </div>
  );
};

export default InstallMetamask;
