import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  chat: {
    overflowY: "auto",
    flex: "1 1 0",
    zIndex: 2,
    padding: "8px 63px",

    "::-webkit-scrollbar": {
      width: 6,
    },

    "::-webkit-scrollbar-thumb": {
      background: theme.palette.scrollbar.color,
    },
  },
}));

export { useStyles };
