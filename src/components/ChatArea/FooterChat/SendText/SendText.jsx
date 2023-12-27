import { useEffect, useState } from "react";
import { useWasapContext } from "@/contexts/useWasapContext";
import { Send } from "@mui/icons-material/";
import { EtherIcon } from "../SendPayment/etherIcon";
import Input from "@/components/Utils/Input/Input";
import { useStyles } from "./styles";

const SendText = ({ setIsPaymentInput }) => {
  const { classes } = useStyles();

  const { sendText, isSendingText, contactSelected, smartContractVersion } =
    useWasapContext();

  const [value, setValue] = useState("");

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setValue(value);
  };

  const handleSendText = async () => {
    setValue("");
    await sendText(contactSelected, value);
  };

  const handleClickSend = () => {
    if (isSendingText || value.length === 0) return;
    handleSendText();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendText();
    }
  };

  const handleOpenEtherInput = () => {
    setIsPaymentInput(true);
  };

  useEffect(() => {
    setValue("");
  }, [contactSelected]);

  return (
    <>
      <Input
        placeholder="Type a message"
        disabled={isSendingText}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        triggerFocus={contactSelected}
      />
      {Boolean(value.length) || !smartContractVersion?.PAYMENTS_ENABLED ? (
        <Send className={classes.iconSendText} onClick={handleClickSend} />
      ) : (
        <div
          className={classes.containerIconEther}
          onClick={handleOpenEtherInput}
        >
          <EtherIcon className={classes.iconEther} />
        </div>
      )}
    </>
  );
};

export default SendText;
