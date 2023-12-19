import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  date: {
    color: `${theme.palette.white}AA`,
    padding: "5px 12px 6px",
    textAlign: "center",
    backgroundColor: theme.palette.lightGray2,
    borderRadius: 7.5,
    boxShadow: "0 1px 0.5px #0B141A21",
    maxWidth: "100% !important",
    fontSize: 12.5,
    width: "max-content",
    alignSelfS: "center",
    margin: "auto",
    marginBottom: 12,
  },
}));

export { useStyles };
