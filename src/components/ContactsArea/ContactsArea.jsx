import { useWasapContext } from "@/contexts/useWasapContext";
import ContactList from "./ContactList/ContactList";
import Header from "./Header/Header";
import NewContact from "./NewContact/NewContact";
import Profile from "./Profile/Profile";
import { useStyles } from "./styles";

const ContactsArea = () => {
  const { classes } = useStyles();
  const { isNewContactOpen, isProfileOpen } = useWasapContext();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Header />
        <ContactList />
        {isNewContactOpen && <NewContact />}
        {isProfileOpen && <Profile />}
      </div>
    </div>
  );
};

export default ContactsArea;
