import { useStyles } from "./styles";

const Input = ({ value, onChange, placeholder, width, error, fontSize }) => {
  const { classes } = useStyles({ width, fontSize });

  return (
    <input
      className={`${classes.input} ${error ? classes.error : ""}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
