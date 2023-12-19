import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    overflowY: "auto",
    width: "100%",
    height: "100%",

    "::-webkit-scrollbar": {
      width: 6,
    },

    "::-webkit-scrollbar-thumb": {
      background: theme.palette.scrollbarColor,
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  legal: {
    color: theme.palette.scrollbarColor,
    fontSize: 13,
    padding: 8,
    width: "90%",
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "center",
    fontWeight: 500,
  },
}));

export { useStyles };
