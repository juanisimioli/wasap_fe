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
    padding: "3px 4px",
    maxWidth: "75%",
    width: 285,
    height: 85,
    borderRadius: isFirstMsgGroup
      ? isSender
        ? "7px 0px 7px 7px"
        : "0px 7px 7px 7px"
      : "7px",
    margin: isFirstMsgGroup ? 0 : "0 8px",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },

  token: {
    marginLeft: 4,
  },

  positive: {
    fontSize: 18,
    fontWeight: 500,
    color: theme.palette.softGreen,
    padding: 4,
  },

  negative: {
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.errorRed,
    padding: 4,
  },

  amount: {
    color: theme.palette.lightGrayishWhite,
    fontSize: 18,
    fontWeight: 400,
    padding: 0,
    margin: 0,
    backgroundColor: "#88888838",
    width: "100%",
    height: "100%",
    borderRadius: "7px 7px 1px 1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  timeStatus: {
    display: "flex",
    paddingRight: isSender ? 0 : 8,
    justifyContent: "flex-end",
    alignItems: "end",
  },

  time: {
    position: "relative",
    fontSize: 11,
    color: theme.palette.lightGrayishWhite,
    margin: 0,
  },

  status: {
    color: theme.palette.lightGrayishWhite,
    fontSize: 17,
    opacity: 0.68,
    height: 20,

    "& svg": {
      margin: "0 4px 0px 3px",
    },
  },
}));

export { useStyles };
