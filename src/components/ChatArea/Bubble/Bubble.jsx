import { useStyles } from "./styles";
import { TailIn, TailOut } from "./tails";
import { Sending, Sent, Delivered } from "./status";

const STATUS_MESSAGE = {
  Sending: 0,
  Sent: 1,
  Delivered: 2,
};

const Bubble = ({ message, time, status, isSender, isFirstMsgGroup }) => {
  const { classes } = useStyles({ isSender, isFirstMsgGroup });

  const renderStatus = () => {
    if (!isSender) return null;

    switch (status) {
      case STATUS_MESSAGE.Sending:
        return <Sending className={classes.status} />;
      case STATUS_MESSAGE.Sent:
        return <Sent className={classes.status} />;
      case STATUS_MESSAGE.Delivered:
        return <Delivered className={classes.status} />;
      default:
        return null;
    }
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
        <p className={classes.message}>{message}</p>
        <p className={classes.time}>{time}</p>
        {renderStatus()}
      </div>
    </div>
  );
};

export default Bubble;
