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

  nameEditContainer: {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,

    "&:hover svg": {
      display: "inline-block",
    },
    zIndex: 100,
  },

  editContactNameIcon: {
    fontSize: 16,
    color: theme.palette.input.placeholder,
    display: "none",
  },

  inputName: {
    all: "unset",
    color: theme.palette.bubble.text,
    fontSize: 16,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 4,

    "&:focus": {
      backgroundColor: theme.palette.input.background,
    },

    position: "absolute",
    left: 0,
    width: "100%",
  },

  spanName: {
    whiteSpace: "pre",
    visibility: "hidden",
    paddingRight: 8,
  },

  icons: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 24,
    gap: 12,
  },

  checkIcon: {
    color: theme.palette.input.send,
    cursor: "pointer",
    width: 22,

    "&:hover": {
      color: theme.palette.bubble.backgroundSender,
    },
  },

  clearIcon: {
    color: theme.palette.input.send,
    cursor: "pointer",
    width: 22,

    "&:hover": {
      color: theme.palette.error.main,
    },
  },

  loader: {
    color: "#005c4b",
    marginLeft: 16,
  },
}));

export { useStyles };
