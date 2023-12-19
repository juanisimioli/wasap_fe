import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    backgroundColor: theme.palette.black,
    width: "100vw",
    height: "100vh",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    backgroundColor: theme.palette.darkGray,
    maxWidth: 600,
    padding: "50px 50px 40px 50px",
    borderRadius: 3,
  },
}));

export { useStyles };
