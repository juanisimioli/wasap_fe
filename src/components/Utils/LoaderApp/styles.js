import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    backgroundColor: theme.palette.black,
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
    color: theme.palette.lightGrayishWhite,
  },

  loader: {
    width: "45%",
    "&.MuiLinearProgress-root": {
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: theme.palette.deepBlue2,
      },
    },

    "&.MuiLinearProgress-indeterminate": {
      backgroundColor: theme.palette.softGreen,
    },
  },
}));

export { useStyles };
