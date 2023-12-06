import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  header: {
    backgroundColor: theme.palette.background.action,
    height: 60,
    zIndex: 10,
    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
  },

  avatar: {
    borderRadius: "50%",
    overflow: "hidden",
    width: 40,
    height: 40,
    marginRight: 15,
  },

  name: {
    color: theme.palette.bubble.text,
    fontSize: 16,
    fontWeight: 600,
  },
}));

export { useStyles };
