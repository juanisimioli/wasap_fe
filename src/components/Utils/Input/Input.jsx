import { useStyles } from "./styles";

const Input = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  width,
  error,
  fontSize,
  maxLength,
  disabled,
}) => {
  const { classes } = useStyles({ width, fontSize });

  return (
    <input
      className={`${classes.input} ${error ? classes.error : ""}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
