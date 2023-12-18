import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },

  titleContainer: {
    display: "flex",
    alignItems: "end",
    backgroundColor: theme.palette.bubble.backgroundReceiver,
    height: 120,
  },

  contentContainer: {
    padding: "26px 4px 24px 16px",
  },

  backIcon: {
    fontSize: 24,
    color: theme.palette.input.title,
    fontWeight: 500,
    cursor: "pointer",
    margin: "0 0 20px 12px",
  },

  title: {
    fontSize: 19,
    color: theme.palette.input.title,
    fontWeight: 500,
    marginLeft: 24,
  },

  inputAddress: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
  },

  icons: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 4,
    marginTop: -2,
  },

  containerVerify: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginTop: 8,
  },

  pasteIcon: {
    color: theme.palette.input.send,
    cursor: "pointer",
    width: 15,

    "&:hover": {
      color: theme.palette.bubble.backgroundSender,
    },
  },

  disabled: {
    color: theme.palette.scrollbar.color,
    cursor: "default",

    "&:hover": {
      color: theme.palette.scrollbar.color,
    },
  },

  clearIcon: {
    color: theme.palette.input.send,
    cursor: "pointer",
    width: 16,

    "&:hover": {
      color: theme.palette.error.main,
    },
  },

  errorMessage: {
    color: theme.palette.error.main,
    fontSize: 14,
    margin: 0,
  },

  verifyButton: {
    all: "unset",
    color: theme.palette.input.title,
    backgroundColor: theme.palette.bubble.backgroundSender,
    padding: "5px 15px",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",

    "&:hover": {
      color: theme.palette.input.color,
    },

    "&:disabled": {
      backgroundColor: theme.palette.input.background,
      color: theme.palette.scrollbar.color,
    },
  },

  addContactButton: {
    all: "unset",
    color: theme.palette.input.title,
    backgroundColor: theme.palette.bubble.backgroundSender,
    padding: "5px 15px",
    borderRadius: "8px",
    fontSize: 14,
    cursor: "pointer",
    minWidth: 87,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {
      color: theme.palette.input.color,
    },

    "&:disabled": {
      backgroundColor: theme.palette.input.background,
      color: theme.palette.scrollbar.color,
    },
  },

  nameNewContact: {
    display: "flex",
    margin: "24px 0",
  },

  avatar: {
    borderRadius: "50%",
    overflow: "hidden",
    width: 40,
    height: 40,
    marginRight: 15,
  },

  loader: {
    color: "#005c4b",
  },
}));

export { useStyles };
