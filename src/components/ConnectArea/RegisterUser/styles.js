import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  avatar: {
    borderRadius: "50%",
    overflow: "hidden",
    width: 40,
    height: 40,
    marginRight: 15,
  },
}));

export { useStyles };
