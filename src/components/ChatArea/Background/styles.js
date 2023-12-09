import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    opacity: 0.06,
    zIndex: 0,
    backgroundImage: "url(/chat-background.png)",
  },
}));

export { useStyles };
