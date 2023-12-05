import SendIcon from "@mui/icons-material/Send";
import { useStyles } from "./styles";

const FooterChat = () => {
  const { classes } = useStyles();
  return (
    <footer className={classes.footer}>
      <input placeholder="Type a message" className={classes.inputMessage} />
      <SendIcon className={classes.iconSendMessage} />
    </footer>
  );
};

export default FooterChat;
