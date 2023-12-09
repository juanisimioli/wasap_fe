import { useStyles } from "./styles";

const Input = ({
  value,
  onChange,
  placeholder,
  width,
  error,
  fontSize,
  maxLength,
}) => {
  const { classes } = useStyles({ width, fontSize });

  return (
    <input
      className={`${classes.input} ${error ? classes.error : ""}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
    />
  );
};

export default Input;
