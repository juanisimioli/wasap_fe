import Image from "next/image";
import { useWasapContext } from "@/contexts/useWasapContext";
import { shortAddress, getUrlAvatar } from "@/utils/utils";
import { useStyles } from "./styles";

const ContactCard = ({ avatar, name, address }) => {
  const { classes } = useStyles();
  const { contactSelected, handleSelectContact } = useWasapContext();

  const isSelected = address === contactSelected;

  return (
    <div
      className={`${classes.container} ${
        isSelected ? classes.selected : classes.nonSelected
      }`}
      onClick={() => handleSelectContact(address)}
    >
      <div>
        <div className={classes.avatar}>
          <Image
            src={getUrlAvatar(avatar)}
            width={49}
            height={49}
            alt="avatar"
          />
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.name}>{name}</p>
        <p className={classes.address}>{shortAddress(address)}</p>
      </div>
    </div>
  );
};

export default ContactCard;
