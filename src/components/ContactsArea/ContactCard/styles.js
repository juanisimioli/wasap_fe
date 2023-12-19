import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme, props, classes) => ({
  container: {
    width: "100%",
    height: 72,
    position: "relative",
    backgroundColor: theme.palette.deepBlue,
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",

    [`&:hover.${classes.nonSelected}`]: {
      backgroundColor: theme.palette.darkGray,
    },
  },

  selected: {
    backgroundColor: theme.palette.deepBlueGreen,
  },

  avatar: {
    margin: "0 15px 0 13px",
    borderRadius: "50%",
    overflow: "hidden",
    width: 49,
    height: 49,
  },

  info: {
    width: "100%",
    height: "100%",
    borderBottom: "1px solid rgba(134,150,160,0.15)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  name: {
    color: theme.palette.lightGrayishWhite,
    fontWeight: 500,
    fontSize: 16,
    margin: 0,
  },

  address: {
    color: theme.palette.lightGrayishWhite,
    fontWeight: 300,
    fontSize: 14,
    margin: 0,
  },
}));

export { useStyles };
