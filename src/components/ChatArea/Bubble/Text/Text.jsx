import { useWasapContext } from "@/contexts/useWasapContext";
import { TailIn, TailOut } from "../tails";
import StatusIcon from "@/components/Utils/StatusIcon/StatusIcon";
import { STATUS_MESSAGE } from "@/utils/utils";
import { useStyles } from "./styles";

const Text = ({ text, time, status, isSender, isFirstMsgGroup }) => {
  const { classes } = useStyles({ isSender, isFirstMsgGroup });
  const { resendText, contactSelected } = useWasapContext();

  const handleResend = () => {
    if (status === STATUS_MESSAGE.Rejected) resendText(contactSelected, text);
  };

  return (
    <div className={classes.container}>
      {isFirstMsgGroup &&
        (isSender ? (
          <TailOut className={classes.tail} />
        ) : (
          <TailIn className={classes.tail} />
        ))}
      <div className={classes.bubble}>
        <p className={classes.text}>{text}</p>
        <p className={classes.time}>{time}</p>
        {isSender && (
          <div className={classes.status} onClick={handleResend}>
            <StatusIcon status={status} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Text;
