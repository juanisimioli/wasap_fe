import { useStyles } from "./styles";
import InstallMetamask from "./InstallMetamask/InstallMetamask";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import UseValidNetwork from "./UseValidNetwork/UseValidNetwork";
import RegisterUser from "./RegisterUser/RegisterUser";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";

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
    // TODO: dApp for educational & learning purposes
    // TODO: add repo and linkedin
  );
};

export default ConnectArea;
