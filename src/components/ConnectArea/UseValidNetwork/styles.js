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
    color: theme.palette.lightGrayishWhite,
  },

  text: {
    color: theme.palette.lightGray,
    fontSize: 18,
    marginTop: 0,
  },
}));

export { useStyles };
