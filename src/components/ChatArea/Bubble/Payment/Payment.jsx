import { ethers } from "ethers";
import { useStyles } from "./styles";
import { TailIn, TailOut } from "../tails";
import StatusIcon from "@/components/Utils/StatusIcon/StatusIcon";

const Payment = ({ amount, time, status, isSender, isFirstMsgGroup }) => {
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
        <p className={classes.amount}>
          <span className={isSender ? classes.negative : classes.positive}>
            {isSender ? "-" : "+"}
          </span>
          {ethers.formatEther(amount)}
          <span className={classes.token}>ETH</span>
        </p>
        <div className={classes.timeStatus}>
          <p className={classes.time}>{time}</p>
          {isSender && (
            <div className={classes.status}>
              <StatusIcon status={status} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
