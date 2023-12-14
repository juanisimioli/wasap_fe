import { useStyles } from "./styles";
import { TailIn, TailOut } from "./tails";
import { Sending, Sent, Delivered } from "./status";

const STATUS_MESSAGE = {
  Sending: 0,
  Sent: 1,
  Delivered: 2,
};

const Bubble = ({ text, time, status, isSender, isFirstMsgGroup }) => {
  const { classes } = useStyles({ isSender, isFirstMsgGroup });

  const renderStatus = () => {
    if (!isSender) return null;

    let icon;

    switch (status) {
      case STATUS_MESSAGE.Sending:
        icon = <Sending className={classes.status} />;
        break;
      case STATUS_MESSAGE.Sent:
        icon = <Sent className={classes.status} />;
        break;
      case STATUS_MESSAGE.Delivered:
        icon = <Delivered className={classes.status} />;
        break;
      default:
        icon = null;
    }

    return <div className={classes.status}>{icon}</div>;
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
        <p className={classes.message}>{text}</p>
        <p className={classes.time}>{time}</p>
        {renderStatus()}
      </div>
    </div>
  );
};

export default Bubble;
