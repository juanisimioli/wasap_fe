import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    backgroundColor: theme.palette.background.chat,
    width: "100vw",
    height: "100vh",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
  },

  title: {
    margin: 0,
    color: theme.palette.bubble.text,
  },

  loader: {
    width: "45%",
    "&.MuiLinearProgress-root": {
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: theme.palette.bubble.backgroundSender,
      },
    },

    "&.MuiLinearProgress-indeterminate": {
      backgroundColor: theme.palette.green.soft,
    },
  },
}));

export { useStyles };
