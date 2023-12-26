import {
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material/";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { shortBalance } from "@/utils/utils";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useStyles } from "./styles";
import { useEffect, useState } from "react";

const Balance = () => {
  const { wallet } = useMetamaskContext();
  const { balance } = wallet;
  const [showBalance, setShowBalance] = useLocalStorage("balance", false);
  const { classes } = useStyles({ showBalance });

  const [isFadeOut, setIsFadeOut] = useState(false);
  const balanceCalc = showBalance ? `${shortBalance(balance)} ETH` : "*** ETH";
  const iconCalc = showBalance ? (
    <VisibilityOutlined />
  ) : (
    <VisibilityOffOutlined />
  );

  const [balanceContent, setBalanceContent] = useState({
    balanceCalc,
    iconCalc,
  });
  const [firstRender, setFirstRender] = useState(true);

  const handleToggleBalance = () => setShowBalance(!showBalance);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    setIsFadeOut(true);
    setTimeout(() => {
      setBalanceContent({ balanceCalc, iconCalc });
      setIsFadeOut(false);
    }, 100);
  }, [balance, showBalance]);

  return (
    <div
      className={`${classes.container} ${
        isFadeOut ? classes.fadeOut : classes.fadeIn
      }`}
    >
      <p className={classes.balance}>{balanceContent.balanceCalc}</p>
      <div className={classes.icons} onClick={handleToggleBalance}>
        {balanceContent.iconCalc}
      </div>
    </div>
  );
};

export default Balance;
