import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  footer: {
    flex: "none",
    backgroundColor: theme.palette.darkGray,
    height: 62.5,

    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    padding: 16,
  },
}));

export { useStyles };
