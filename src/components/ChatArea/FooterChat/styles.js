import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  footer: {
    flex: "none",
    backgroundColor: theme.palette.background.action,
    height: 62.5,

    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    padding: 16,
  },

  inputMessage: {
    height: 42.05,
    padding: 9,
    backgroundColor: theme.palette.input.background,
    border: `1px solid ${theme.palette.input.background}`,
    borderRadius: 8,
    width: "100%",
    marginLeft: 40,
    color: theme.palette.input.color,

    fontSize: 15,
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
  },

  iconSendMessage: {
    color: theme.palette.input.send,
    margin: 8,
    cursor: "pointer",
  },
}));

export { useStyles };
