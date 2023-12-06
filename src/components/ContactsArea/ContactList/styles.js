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
      background: theme.palette.scrollbar.color,
    },
    display: "flex",
    flexDirection: "column",
  },

  list: {},

  legal: {
    color: theme.palette.bubble.text,
    fontSize: 13,
    padding: "8px",
    width: "90%",
    justifySelf: "center",
    alignSelf: "center",
    textAlign: "center",
    fontWeight: 500,
  },
}));

export { useStyles };
