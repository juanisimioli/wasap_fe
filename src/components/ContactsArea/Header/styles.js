import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  header: {
    backgroundColor: theme.palette.darkGray,
    zIndex: 10,
    borderRight: "1px solid rgba(134,150,160,0.15)",
  },

  content: {
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    height: 60,
    justifyContent: "space-between",
    paddingRight: 20,
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  avatar: {
    borderRadius: "50%",
    overflow: "hidden",
    width: 40,
    height: 40,
    marginRight: 15,
    cursor: "pointer",
  },

  addIcon: {
    color: theme.palette.grayBlue,
    cursor: "pointer",
    marginTop: 6,

    svg: {
      fontSize: 30,
    },
  },
}));

export { useStyles };
