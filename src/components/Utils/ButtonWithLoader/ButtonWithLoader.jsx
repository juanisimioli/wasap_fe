import { CircularProgress } from "@mui/material";
import { useStyles } from "./styles";

const ButtonWithLoader = ({ title, isLoading, onClick, disabled }) => {
  const { classes } = useStyles();

  return (
    <button
      className={classes.button}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <CircularProgress size={24} className={classes.loader} />
      ) : (
        title
      )}
    </button>
  );
};

export default ButtonWithLoader;
