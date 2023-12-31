import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import InstallMetamask from "./InstallMetamask/InstallMetamask";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import UseValidNetwork from "./UseValidNetwork/UseValidNetwork";
import RegisterUser from "./RegisterUser/RegisterUser";
import { useStyles } from "./styles";

const ConnectArea = () => {
  const { classes } = useStyles();

  const { isMetamask, wallet, isAllowedChainId } = useMetamaskContext();
  const { address } = wallet;

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {!isMetamask ? (
          <InstallMetamask />
        ) : !address ? (
          <ConnectWallet />
        ) : !isAllowedChainId ? (
          <UseValidNetwork />
        ) : (
          <RegisterUser />
        )}
      </div>
    </div>
  );
};

export default ConnectArea;
