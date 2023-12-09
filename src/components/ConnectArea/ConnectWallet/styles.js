import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 36,
  },

  title: {
    margin: 0,
    color: theme.palette.bubble.text,
  },

  text: {
    color: theme.palette.input.title,
    fontSize: 18,
    margin: 0,
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
    gap: 16,
    padding: 15,

    "&:hover": {
      color: theme.palette.input.color,
    },
  },
}));

export { useStyles };
