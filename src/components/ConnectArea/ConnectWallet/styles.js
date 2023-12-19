import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 36,
    minHeight: 240,
  },

  title: {
    margin: 0,
    color: theme.palette.lightGrayishWhite,
  },

  text: {
    color: theme.palette.lightGray,
    fontSize: 18,
    margin: 0,
  },
  button: {
    all: "unset",
    color: theme.palette.lightGray,
    backgroundColor: theme.palette.deepBlue2,
    padding: "5px 15px",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 15,

    "&:hover": {
      color: theme.palette.white,
    },
  },
}));

export { useStyles };
