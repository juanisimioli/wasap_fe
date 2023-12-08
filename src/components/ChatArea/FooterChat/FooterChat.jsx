import SendIcon from "@mui/icons-material/Send";
import { useStyles } from "./styles";
import Input from "@/components/Utils/Input/Input";

const FooterChat = () => {
  const { classes } = useStyles();
  return (
    <footer className={classes.footer}>
      <Input placeholder="Type a message" />
      <SendIcon className={classes.iconSendMessage} />
    </footer>
  );
};

export default FooterChat;
