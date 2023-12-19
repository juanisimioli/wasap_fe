import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    color: theme.palette.gray,
    gap: 10,
    display: "flex",
    position: "absolute",
    bottom: 14,
    minWidth: 400,

    "& svg": {
      color: theme.palette.gray,
      "&:hover": {
        color: theme.palette.lightGrayishWhite,
      },
    },
  },
}));

export { useStyles };
