import { useStyles } from "./styles";

const UseValidNetwork = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <p className={classes.text}>Please connect to Sepolia testnet</p>
    </div>
  );
};

export default UseValidNetwork;
