import { useRef, useEffect } from "react";
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
  isNumber = false,
  triggerFocus,
}) => {
  const { classes } = useStyles({ width, fontSize });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [triggerFocus]);

  return (
    <input
      ref={inputRef}
      className={`${classes.input} ${error ? classes.error : ""} ${
        isNumber ? classes.isNumber : ""
      }`}
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
