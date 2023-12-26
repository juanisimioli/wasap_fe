import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  rejected: {
    fontSize: 20,
    color: "red",
    cursor: "pointer",
  },
}));

export { useStyles };
