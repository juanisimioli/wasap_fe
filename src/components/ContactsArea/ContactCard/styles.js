import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    width: "100%",
    height: 72,
    position: "relative",
    backgroundColor: theme.palette.background.contacts,
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",

    "&:hover": {
      backgroundColor: "#202C33",
    },

    selected: {
      backgroundColor: "#2A3942",
    },
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
    color: theme.palette.bubble.text,
    fontWeight: 500,
    fontSize: 16,
    margin: 0,
  },

  address: {
    color: theme.palette.bubble.text,
    fontWeight: 300,
    fontSize: 14,
    margin: 0,
  },
}));

export { useStyles };
