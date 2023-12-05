import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },

  content: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    backgroundColor: theme.palette.background.chat,
    position: "relative",
  },
}));

export { useStyles };
