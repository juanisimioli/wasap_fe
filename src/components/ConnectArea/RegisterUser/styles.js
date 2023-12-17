import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    minHeight: 440,
  },

  title: {
    margin: 0,
    color: theme.palette.bubble.text,
  },

  address: {
    color: theme.palette.bubble.text,
    margin: "12px 0 0 0",
    padding: 9,
  },

  error: {
    margin: "8px 0 0 0",
    color: theme.palette.error.main,
    textAlign: "center",
  },

  errorZeroTokens: {
    color: theme.palette.error.main,
    textAlign: "center",
    margin: 0,
    "& a": {
      all: "unset",
      fontWeight: 500,
      color: theme.palette.bubble.text,
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.bubble.backgroundSender,
      },
    },
  },

  button: {
    all: "unset",
    color: theme.palette.input.title,
    backgroundColor: theme.palette.bubble.backgroundSender,
    padding: "5px 15px",
    borderRadius: "8px",
    fontSize: 14,
    cursor: "pointer",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 15,
    minWidth: 60,

    "&:disabled": {
      backgroundColor: theme.palette.input.background,
      color: theme.palette.scrollbar.color,
    },

    "&:hover:enabled": {
      color: theme.palette.input.color,
    },
  },

  loader: {
    color: "#005c4b",
  },
}));

export { useStyles };
