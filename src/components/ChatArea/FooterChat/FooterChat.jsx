import SendIcon from "@mui/icons-material/Send";
import { useStyles } from "./styles";
import Input from "@/components/Utils/Input/Input";
import { useWasapContext } from "@/contexts/useWasapContext";
import { useState } from "react";

const FooterChat = () => {
  const { classes } = useStyles();
  const { sendMessage, isSendingMessage, contactSelected } = useWasapContext();

  const [value, setValue] = useState("");

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setValue(value);
  };

  const handleSendMessage = async () => {
    await sendMessage(contactSelected, value);
    setValue("");
  };

  const handleClickSend = () => {
    if (isSendingMessage || value.length === 0) return;
    handleSendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <footer className={classes.footer}>
      <Input
        placeholder="Type a message"
        disabled={isSendingMessage}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SendIcon className={classes.iconSendMessage} onClick={handleClickSend} />
    </footer>
  );
};

export default FooterChat;
