import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },

  titleContainer: {
    display: "flex",
    alignItems: "end",
    backgroundColor: theme.palette.darkGray,
    height: 120,
  },

  contentContainer: {
    padding: "26px 4px 24px 16px",
  },

  backIcon: {
    fontSize: 24,
    color: theme.palette.lightGray,
    fontWeight: 500,
    cursor: "pointer",
    margin: "0 0 20px 12px",
  },

  title: {
    fontSize: 19,
    color: theme.palette.lightGray,
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
    color: theme.palette.grayBlue,
    cursor: "pointer",
    width: 15,

    "&:hover": {
      color: theme.palette.deepBlue2,
    },
  },

  disabled: {
    color: theme.palette.scrollbarColor,
    cursor: "default",

    "&:hover": {
      color: theme.palette.scrollbarColor,
    },
  },

  clearIcon: {
    color: theme.palette.grayBlue,
    cursor: "pointer",
    width: 16,

    "&:hover": {
      color: theme.palette.errorRed,
    },
  },

  errorMessage: {
    color: theme.palette.errorRed,
    fontSize: 14,
    margin: 0,
  },

  verifyButton: {
    all: "unset",
    color: theme.palette.lightGray,
    backgroundColor: theme.palette.deepBlue2,
    padding: "5px 15px",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",

    "&:hover": {
      color: theme.palette.white,
    },

    "&:disabled": {
      backgroundColor: theme.palette.deepBlueGreen,
      color: theme.palette.scrollbarColor,
    },
  },

  addContactButton: {
    all: "unset",
    color: theme.palette.lightGray,
    backgroundColor: theme.palette.deepBlue2,
    padding: "5px 15px",
    borderRadius: "8px",
    fontSize: 14,
    cursor: "pointer",
    minWidth: 87,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {
      color: theme.palette.white,
    },

    "&:disabled": {
      backgroundColor: theme.palette.deepBlueGreen,
      color: theme.palette.scrollbarColor,
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
    color: theme.palette.deepBlue2,
  },
}));

export { useStyles };
