import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme, { isSender, isFirstMsgGroup }) => ({
  container: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: isSender ? "row-reverse" : "row",
    marginBottom: 2,
  },

  tail: {
    color: isSender ? theme.palette.deepBlue2 : theme.palette.darkGray,
  },

  bubble: {
    backgroundColor: isSender
      ? theme.palette.deepBlue2
      : theme.palette.darkGray,
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

  text: {
    color: theme.palette.lightGrayishWhite,
    fontSize: 15,
    fontWeight: 400,
    padding: 0,
    margin: 0,
    overflowWrap: "anywhere",
  },

  time: {
    position: "relative",
    fontSize: 11,
    color: theme.palette.lightGrayishWhite,
    margin: 0,
    alignSelf: "end",
    marginBottom: -7,
  },

  status: {
    color: theme.palette.lightGrayishWhite,
    fontSize: 17,
    alignSelf: "end",
    margin: "0 -3px -11px -3px",
    opacity: 0.68,
  },
}));

export { useStyles };
