import { useWasapContext } from "@/contexts/useWasapContext";
import ContactList from "./ContactList/ContactList";
import Header from "./Header/Header";
import AddUser from "./AddUser/AddUser";
import EditInfo from "./EditInfo/EditInfo";
import { useStyles } from "./styles";

const ContactsArea = () => {
  const { classes } = useStyles();
  const { isAddContactOpened, isEditUserOpened } = useWasapContext();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Header />
        <ContactList />
        {isAddContactOpened && <AddUser />}
        {isEditUserOpened && <EditInfo />}
      </div>
    </div>
  );
};

export default ContactsArea;
