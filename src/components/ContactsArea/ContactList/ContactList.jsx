import ContactCard from "../ContactCard/ContactCard";
import { useStyles } from "./styles";
import { useWasapContext } from "@/contexts/useWasapContext";

const ContactList = () => {
  const { classes } = useStyles();
  const { contactList } = useWasapContext();

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        {contactList.map(({ name, addressUser, avatar }) => (
          <ContactCard
            name={name}
            address={addressUser}
            avatar={avatar}
            key={`${addressUser}_card`}
          />
        ))}
      </div>

      <p className={classes.legal}>dApp for educational & learning purposes</p>
    </div>
  );
};

export default ContactList;
