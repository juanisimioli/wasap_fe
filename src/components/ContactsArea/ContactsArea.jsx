import { useStyles } from "./styles";
import ContactList from "./ContactList/ContactList";
import Header from "./Header/Header";
import AddUser from "./AddUser/AddUser";
import EditInfo from "./EditInfo/EditInfo";
import { useWasapContext } from "@/contexts/useWasapContext";

const ContactsArea = () => {
  const { classes } = useStyles();
  const { isAddContactOpened, isEditUserOpened } = useWasapContext();

  console.log(isEditUserOpened);

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
