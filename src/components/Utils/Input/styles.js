import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme, { width, fontSize }) => ({
  input: {
    height: 42.05,
    padding: 9,
    backgroundColor: theme.palette.input.background,
    border: `1px solid ${theme.palette.input.background}`,
    borderRadius: 8,

    color: theme.palette.input.color,

    width: width || "100%",

    fontSize: fontSize || 15,
    fontWeight: 400,

    lineHeight: "1.47em",
    maxHeight: "7.35em",
    minHeight: "1.47em",
    userSelect: "text",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",

    "&:focus": {
      outline: "none",
    },

    "&::placeholder": {
      color: theme.palette.input.placeholder,
    },

    error: {},
  },
}));

export { useStyles };
