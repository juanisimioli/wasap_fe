import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    height: "100vh",
    position: "relative",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: theme.palette.background.contacts,
    position: "relative",
    width: 400,
    borderRight: "1px solid rgba(134,150,160,0.15)",
  },
}));

export { useStyles };
