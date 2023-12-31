import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme, { uploading }, classes) => ({
  none: {
    display: "none",
  },
  upload: {
    borderRadius: "50%",
    overflow: "hidden",
    width: 150,
    height: 150,
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: uploading ? theme.palette.deepBlueGreen : "none",

    [`&:hover .${classes.uploadArea}`]: {
      opacity: 0.8,
    },
  },

  uploadArea: {
    position: "absolute",
    backgroundColor: theme.palette.darkGray,
    zIndex: 100,
    width: "100%",
    height: "100%",
    color: theme.palette.lightGrayishWhite,
    transition: "all 0.15s",
    opacity: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  uploadText: {
    fontWeight: 600,
    fontSize: 13,
    width: "50%",
    textAlign: "center",
  },

  loader: {
    color: theme.palette.deepBlue2,
  },
}));

export { useStyles };
