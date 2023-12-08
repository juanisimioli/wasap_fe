import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  text: {
    color: theme.palette.input.title,
    fontSize: 18,
    marginTop: 16,
  },
}));

export { useStyles };
