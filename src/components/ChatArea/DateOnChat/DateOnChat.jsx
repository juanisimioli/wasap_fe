import { dateTimeInfo } from "@/utils/utils";
import { useStyles } from "./styles";

const DateOnChat = ({ date }) => {
  const { classes } = useStyles();

  const nowDate = dateTimeInfo(Date.now() / 1000).date;
  const renderDate = date === nowDate ? "TODAY" : date;

  return <div className={classes.date}>{renderDate}</div>;
};

export default DateOnChat;
