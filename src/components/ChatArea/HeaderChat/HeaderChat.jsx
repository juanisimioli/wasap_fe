import { useStyles } from "./styles";
import Image from "next/image";

const HeaderChat = () => {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.avatar}>
        <Image src={"/juani.png"} width={40} height={40} alt="avatar" />
      </div>
      <p className={classes.name}>Juani Simioli</p>
    </header>
  );
};

export default HeaderChat;
