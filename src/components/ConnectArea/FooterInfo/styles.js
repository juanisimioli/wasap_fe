import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    color: theme.palette.input.placeholder,
    gap: 10,
    display: "flex",
    marginTop: 10,

    "& svg": {
      color: theme.palette.input.placeholder,
    },
  },
}));

export { useStyles };
