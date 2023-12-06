import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    position: "fixed",
    right: 12,
    bottom: 79,
    width: 42,
    height: 42,
    backgroundColor: theme.palette.bubble.backgroundReceiver,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 100,

    transform: "scaleX(1) scaleY(1)",
    opacity: 1,
    transition: "all 0.08s",
  },

  disappear: {
    transform: "scaleX(0) scaleY(0)",
    opacity: 0,
  },

  icon: {
    color: theme.palette.input.send,
  },
}));

export { useStyles };
