import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  header: {
    backgroundColor: theme.palette.background.action,
    zIndex: 10,
    borderRight: "1px solid rgba(134,150,160,0.15)",
  },

  content: {
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    height: 60,
  },

  avatar: {
    borderRadius: "50%",
    overflow: "hidden",
    width: 40,
    height: 40,
    marginRight: 15,
  },
}));

export { useStyles };
