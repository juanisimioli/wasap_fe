import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {},

  text: {
    color: theme.palette.input.title,
    fontSize: 18,
    marginTop: 16,
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
    width: 100,

    "&:hover": {
      color: theme.palette.input.color,
    },
  },
}));

export { useStyles };
