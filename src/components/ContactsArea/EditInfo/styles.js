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
    padding: "24px 12px 24px 16pxf",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    marginTop: 36,
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

  inputName: {
    display: "flex",
    flexDirection: "row",
    width: 300,
  },

  containerAction: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginTop: 8,
  },

  errorMessage: {
    color: theme.palette.error.main,
    fontSize: 14,
    margin: 0,
  },

  saveButton: {
    all: "unset",
    color: theme.palette.input.title,
    backgroundColor: theme.palette.bubble.backgroundSender,
    padding: "5px 15px",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
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

  loader: {
    color: "#005c4b",
  },
}));

export { useStyles };
