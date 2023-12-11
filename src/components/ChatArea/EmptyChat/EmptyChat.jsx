import FooterInfo from "@/components/ConnectArea/FooterInfo/FooterInfo";
import { useStyles } from "./styles";
import Image from "next/image";

const EmptyChat = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Image width={303} height={172} src="/wasap-initial.svg" />
      <h2 className={classes.title}>Wasap Web</h2>
      <p className={classes.text}>
        Send and receive messages through blockchain
      </p>
      <FooterInfo />
    </div>
  );
};

export default EmptyChat;
