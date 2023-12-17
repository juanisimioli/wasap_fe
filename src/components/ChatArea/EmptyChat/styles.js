import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    backgroundColor: "#242E34",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 470,
  },

  title: {
    color: `${theme.palette.bubble.text}e0`,
    fontWeight: 500,
    fontSize: 32,
  },
  text: {
    color: `${theme.palette.bubble.text}e0`,
  },
}));

export { useStyles };
