import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useStyles } from "./styles";

const RegisterUser = () => {
  const { classes } = useStyles();
  const { wallet } = useMetamaskContext();
  const { address, balance } = wallet;

  return (
    <div>
      <div>Register</div>
      <p>
        Your current balance is 0 ETH. You can use this{" "}
        <a target="_blank" href="https://sepoliafaucet.com/">
          faucet
        </a>{" "}
        to obtain some free ETH
        {balance}
      </p>

      <p>{address}</p>
      <p></p>
      <input placeholder="name" />
      <img alt="avatar" />
      <button>Register</button>
    </div>
  );
};

export default RegisterUser;
