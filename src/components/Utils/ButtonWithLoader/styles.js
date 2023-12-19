import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  button: {
    all: "unset",
    color: theme.palette.lightGray,
    backgroundColor: theme.palette.deepBlue2,
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 12,
    minWidth: 60,

    "&:disabled": {
      backgroundColor: theme.palette.deepBlueGreen,
      color: theme.palette.scrollbarColor,
    },

    "&:hover:enabled": {
      color: theme.palette.white,
    },
  },

  loader: {
    color: theme.palette.deepBlue2,
  },
}));

export { useStyles };
