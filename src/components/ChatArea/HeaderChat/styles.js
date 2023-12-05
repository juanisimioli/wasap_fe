import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  header: {
    backgroundColor: theme.palette.background.action,
    height: 53,
    zIndex: 10,
    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
  },
}));

export { useStyles };
