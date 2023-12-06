import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme, { isSender, isFirstMsgGroup }) => ({
  container: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: isSender ? "row-reverse" : "row",
    marginBottom: 2,
  },

  tail: {
    color: isSender
      ? theme.palette.bubble.backgroundSender
      : theme.palette.bubble.backgroundReceiver,
  },

  bubble: {
    backgroundColor: isSender
      ? theme.palette.bubble.backgroundSender
      : theme.palette.bubble.backgroundReceiver,
    padding: "6px 12px 8px 12px",
    maxWidth: "75%",
    borderRadius: isFirstMsgGroup
      ? isSender
        ? "7px 0px 7px 7px"
        : "0px 7px 7px 7px"
      : "7px",
    margin: isFirstMsgGroup ? 0 : "0 8px",
    display: "flex",
    gap: 6,
  },

  message: {
    color: theme.palette.bubble.text,
    fontSize: 15,
    fontWeight: 400,
    padding: 0,
    margin: 0,
  },

  time: {
    position: "relative",
    fontSize: 11,
    color: theme.palette.bubble.text,
    margin: 0,
    alignSelf: "end",
    marginBottom: -7,
  },

  status: {
    color: theme.palette.bubble.text,
    fontSize: 17,
    alignSelf: "end",
    marginLeft: -2,
    marginBottom: -5,
    opacity: 0.68,
  },
}));

export { useStyles };
