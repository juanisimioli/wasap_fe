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
    color: theme.palette.lightGrayishWhite,
  },

  address: {
    color: theme.palette.lightGrayishWhite,
    margin: "12px 0 0 0",
    padding: 9,
  },

  error: {
    margin: "8px 0 0 0",
    color: theme.palette.errorRed,
    textAlign: "center",
  },

  errorZeroTokens: {
    color: theme.palette.errorRed,
    textAlign: "center",
    margin: 0,
    "& a": {
      all: "unset",
      fontWeight: 500,
      color: theme.palette.lightGrayishWhite,
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.deepBlue2,
      },
    },
  },
}));

export { useStyles };
