import { useStyles } from "./styles";
import InstallMetamask from "./InstallMetamask/InstallMetamask";
import ConnectWallet from "./ConnectWallet/ConnectWallet";
import UseValidNetwork from "./UseValidNetwork/UseValidNetwork";
import RegisterUser from "./RegisterUser/RegisterUser";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";

const ConnectArea = () => {
  const { classes } = useStyles();

  const { isMetamask, isConnecting } = useMetamaskContext();

  return (
    <div>
      <div className={classes.background} />
      <div className={classes.content}>
        {/* {!false && <InstallMetamask />}
        {!false && <ConnectWallet />}
        {!false && <UseValidNetwork />} */}
        {!false && <RegisterUser />}
      </div>
    </div>
    // <div>
    //   <h1>Use Wasap on your computer</h1>
    //   <p>dApp for educational & learning purposes</p>
    //   <p>{JSON.stringify({ isMetamask, isConnecting })}</p>
    // </div>

    // ADD REPO AND LINKEDIN
  );
};

export default ConnectArea;
