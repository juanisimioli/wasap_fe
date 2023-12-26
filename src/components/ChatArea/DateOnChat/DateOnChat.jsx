import { dateTimeInfo } from "@/utils/utils";
import { useStyles } from "./styles";

const DateOnChat = ({ date }) => {
  const { classes } = useStyles();

  const today = dateTimeInfo(Date.now() / 1000).date;
  const yesterday = dateTimeInfo((Date.now() - 86400000) / 1000).date;

  let renderDate;

  switch (true) {
    case date === today:
      renderDate = "TODAY";
      break;
    case date === yesterday:
      renderDate = "YESTERDAY";
      break;
    default:
      renderDate = date;
  }

  return <div className={classes.date}>{renderDate}</div>;
};

export default DateOnChat;
