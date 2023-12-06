import ContactCard from "../ContactCard/ContactCard";
import { useStyles } from "./styles";

const ContactList = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <ContactCard
          name="Martin Barrioxi"
          avatar=""
          address={"0x709....c79C8"}
        />
        <ContactCard name="Sr Joven" avatar="" />
        <ContactCard name="Tina" avatar="" />
        <ContactCard name="Sofía Mansiri" avatar="" />
        <ContactCard name="Martin Barrioxi" avatar="" />
        <ContactCard name="Sr Joven" avatar="" />
        <ContactCard name="Tina" avatar="" />
        <ContactCard name="Sofía Mansiri" avatar="" />
        <ContactCard name="Martin Barrioxi" avatar="" />
        <ContactCard name="Sr Joven" avatar="" />
        <ContactCard name="Tina" avatar="" />
        <ContactCard name="Sofía Mansiri" avatar="" />
        <ContactCard name="Martin Barrioxi" avatar="" />
        <ContactCard name="Sr Joven" avatar="" />
        <ContactCard name="Tina" avatar="" />
        <ContactCard name="Sofía Mansiri" avatar="" />
        <ContactCard name="Martin Barrioxi" avatar="" />
        <ContactCard name="Sr Joven" avatar="" />
        <ContactCard name="Tina" avatar="" />
        <ContactCard name="Sofía Mansiri" avatar="" />
        <ContactCard name="Martin Barrioxi" avatar="" />
        <ContactCard name="Sr Joven" avatar="" />
        <ContactCard name="Tina" avatar="" />
        <ContactCard name="Sofía Mansiri" avatar="" />
        <ContactCard name="Martin Barrioxi" avatar="" />
        <ContactCard name="Sr Joven" avatar="" />
        <ContactCard name="Tina" avatar="" />
        <ContactCard name="Sofía Mansiri" avatar="" />
        <ContactCard name="Martin Barrioxi" avatar="" />
        <ContactCard name="Sr Joven" avatar="" />
        <ContactCard name="Tina" avatar="" />
        <ContactCard name="Sofía Mansiri" avatar="" />
      </div>

      <p className={classes.legal}>dApp for educational & learning purposes</p>
    </div>
  );
};

export default ContactList;
