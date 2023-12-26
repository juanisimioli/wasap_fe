import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme, { showBalance }) => ({
  container: {
    display: "flex",
    alignItems: "center",
    color: showBalance ? theme.palette.lightGray : theme.palette.gray,
    transition: "opacity 0.1s ease",
  },
  fadeOut: {
    opacity: 0,
  },
  fadeIn: {
    opacity: 1,
  },
  balance: {
    marginRight: 8,
    userSelect: "none",
  },
  icons: {
    cursor: "pointer",
    "& svg": {
      fontSize: 18,
      marginTop: 6,
    },
  },
}));

export { useStyles };
