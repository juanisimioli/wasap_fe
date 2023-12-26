import { useState } from "react";
import SendPayment from "./SendPayment/SentPayment";
import SendText from "./SendText/SendText";
import { useStyles } from "./styles";

const FooterChat = () => {
  const { classes } = useStyles();
  const [isPaymentInput, setIsPaymentInput] = useState(false);

  return (
    <footer className={classes.footer}>
      {isPaymentInput ? (
        <SendPayment
          isPaymentInput={isPaymentInput}
          setIsPaymentInput={setIsPaymentInput}
        />
      ) : (
        <SendText
          isPaymentInput={isPaymentInput}
          setIsPaymentInput={setIsPaymentInput}
        />
      )}
    </footer>
  );
};

export default FooterChat;
