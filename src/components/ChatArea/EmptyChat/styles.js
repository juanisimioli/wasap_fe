import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    backgroundColor: theme.palette.darkGray2,
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 470,
  },

  title: {
    color: `${theme.palette.lightGrayishWhite}e0`,
    fontWeight: 500,
    fontSize: 32,
    marginBottom: -8,
  },
  text: {
    color: `${theme.palette.lightGrayishWhite}e0`,
  },
}));

export { useStyles };
