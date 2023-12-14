import { useWasapContext } from "@/contexts/useWasapContext";
import { useStyles } from "./styles";
import Image from "next/image";
import { getUrlAvatar } from "@/utils/utils";

const HeaderChat = () => {
  const { classes } = useStyles();
  const { contactSelectedData } = useWasapContext();
  const { name, avatar } = contactSelectedData;

  return (
    <header className={classes.header}>
      <div className={classes.avatar}>
        <Image
          src={getUrlAvatar(avatar)}
          width={40}
          height={40}
          alt="avatar"
          priority
        />
      </div>
      <p className={classes.name}>{name}</p>
    </header>
  );
};

export default HeaderChat;
