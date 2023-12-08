import { useStyles } from "./styles";
import Image from "next/image";
import Link from "next/link";

const InstallMetamask = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
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
      <p className={classes.text}>You must have Metamask extension installed</p>
    </div>
  );
};

export default InstallMetamask;
