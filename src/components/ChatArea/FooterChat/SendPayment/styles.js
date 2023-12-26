import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  token: {
    fontWeight: 500,
    color: theme.palette.gray,
    marginRight: 12,
  },

  clearIcon: {
    color: theme.palette.grayBlue,
    cursor: "pointer",
    width: 24,
    marginRight: 8,

    "&:hover": {
      color: theme.palette.errorRed,
    },
  },
}));

export { useStyles };
