import { useStyles } from "./styles";
import { TailIn, TailOut } from "../tails";
import StatusIcon from "@/components/Utils/StatusIcon/StatusIcon";

const Text = ({ text, time, status, isSender, isFirstMsgGroup }) => {
  const { classes } = useStyles({ isSender, isFirstMsgGroup });

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
          <div className={classes.status}>
            <StatusIcon status={status} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Text;
