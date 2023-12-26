import { useState } from "react";
import { parseEther } from "ethers";
import { useWasapContext } from "@/contexts/useWasapContext";
import { Clear } from "@mui/icons-material/";
import ButtonWithLoader from "@/components/Utils/ButtonWithLoader/ButtonWithLoader";
import Input from "@/components/Utils/Input/Input";
import { validateAmountEther } from "@/utils/validations";
import { useStyles } from "./styles";

const SendPayment = ({ setIsPaymentInput }) => {
  const { classes } = useStyles();

  const [paymentValue, setPaymentValue] = useState("");
  const [isValidValue, setIsValidValue] = useState(false);

  const { sendPayment, contactSelected, isSendingPayment } = useWasapContext();

  const handleInputPaymentChange = ({ target }) => {
    const { value } = target;

    const onlyNumbers = validateAmountEther(value);

    setPaymentValue(onlyNumbers);
    setIsValidValue(Number(onlyNumbers) > 0);
  };

  const handleKeyPaymentDown = (e) => {
    if (e.key === "Enter" && isValidValue) {
      handleSendPayment();
    }
    if (e.key == "Escape") {
      setIsPaymentInput(false);
    }
  };

  const handleSendPayment = async () => {
    const amountInWei = parseEther(paymentValue);
    await sendPayment(contactSelected, amountInWei);
    setIsPaymentInput(false);
  };

  const handleCloseEtherInput = () => {
    if (isSendingPayment) return;
    setIsPaymentInput(false);
  };

  return (
    <div className={classes.container}>
      <Input
        placeholder="Type amount"
        disabled={isSendingPayment}
        value={paymentValue}
        onChange={handleInputPaymentChange}
        onKeyDown={handleKeyPaymentDown}
        width={200}
        isNumber
      />
      <p className={classes.token}>ETH</p>
      <ButtonWithLoader
        disabled={!isValidValue}
        title="Send"
        onClick={handleSendPayment}
        isLoading={isSendingPayment}
        isSmall
      />
      <Clear className={classes.clearIcon} onClick={handleCloseEtherInput} />
    </div>
  );
};

export default SendPayment;
