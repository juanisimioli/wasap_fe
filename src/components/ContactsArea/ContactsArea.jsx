import { useStyles } from "./styles";
import ContactList from "./ContactList/ContactList";
import Header from "./Header/Header";
import AddUser from "./AddUser/AddUser";

const ContactsArea = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Header />
        <ContactList />
        {/* <AddUser /> */}
      </div>
    </div>
  );
};

export default ContactsArea;
