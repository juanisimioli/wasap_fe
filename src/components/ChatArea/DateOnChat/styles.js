import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  date: {
    color: `${theme.palette.input.color}AA`,
    padding: "5px 12px 6px",
    textAlign: "center",
    backgroundColor: "#182229EE",
    borderRadius: "7.5px",
    boxShadow: "0 1px 0.5px #0B141A21",

    maxWidth: "100% !important",
    fontSize: 12.5,
    width: "max-content",
    alignSelfS: "center",
    margin: "0 0 12px 0",
  },
}));

export { useStyles };
