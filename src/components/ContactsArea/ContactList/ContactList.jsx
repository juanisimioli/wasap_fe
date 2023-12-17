import ContactCard from "../ContactCard/ContactCard";
import { useStyles } from "./styles";
import { useWasapContext } from "@/contexts/useWasapContext";

const ContactList = () => {
  const { classes } = useStyles();
  const { contactList, isEditUserOpened, isAddContactOpened } =
    useWasapContext();

  if (isEditUserOpened || isAddContactOpened) return null;

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        {contactList.map(({ name, contactAddress, avatar }) => (
          <ContactCard
            name={name}
            address={contactAddress}
            avatar={avatar}
            key={`${contactAddress}_card`}
          />
        ))}
      </div>

      <p className={classes.legal}>dApp for educational & learning purposes</p>
    </div>
  );
};

export default ContactList;
