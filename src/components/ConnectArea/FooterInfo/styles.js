import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    color: theme.palette.input.placeholder,
    gap: 10,
    display: "flex",
    position: "absolute",
    bottom: 14,

    "& svg": {
      color: theme.palette.input.placeholder,
      "&:hover": {
        color: theme.palette.bubble.text,
      },
    },
  },
}));

export { useStyles };
