import { useWasapContext } from "@/contexts/useWasapContext";
import ContactCard from "../ContactCard/ContactCard";
import { useStyles } from "./styles";

const ContactList = () => {
  const { classes } = useStyles();
  const { contactList, isEditUserOpened, isAddContactOpened } =
    useWasapContext();

  if (isEditUserOpened || isAddContactOpened) return null;

  return (
    <div className={classes.container}>
      <div>
        {contactList?.map(({ name, contactAddress, avatar }) => (
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
