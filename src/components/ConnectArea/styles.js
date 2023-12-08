import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },

  background: {
    backgroundColor: theme.palette.background.chat,
    width: "100vw",
    height: "100vh",
    position: "absolute",
  },

  content: {
    backgroundColor: theme.palette.background.action,
    maxWidth: 1000,
    width: "75%",
    padding: "64px 60px 60px",
    position: "fixed",
    margin: "0 auto",
    zIndex: 10,
    top: 130,
    marginLeft: "12.5%",

    borderRadius: 3,
    boxShadow:
      "0 17px 50px 0 rgba(11,20,26,.19), 0 12px 15px 0 rgba(11,20,26,.24)",
  },
}));

export { useStyles };
