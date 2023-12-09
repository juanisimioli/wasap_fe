import { useStyles } from "./styles";
import Image from "next/image";

const ContactCard = ({ avatar, name, address = "0x000001" }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.avatar}>
          <Image
            src={"/default-user.svg"}
            width={49}
            height={49}
            alt="avatar"
          />
        </div>
      </div>
      <div className={classes.info}>
        <p className={classes.name}>{name}</p>
        <p className={classes.address}>{address}</p>
      </div>
    </div>
  );
};

export default ContactCard;
