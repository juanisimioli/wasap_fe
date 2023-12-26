import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme, { isSmall }) => ({
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
    padding: isSmall ? 6 : 12,
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
