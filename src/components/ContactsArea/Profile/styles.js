import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },

  titleContainer: {
    display: "flex",
    alignItems: "end",
    backgroundColor: theme.palette.darkGray,
    height: 120,
  },

  contentContainer: {
    padding: "24px 12px 24px 16pxf",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    marginTop: 36,
  },

  backIcon: {
    fontSize: 24,
    color: theme.palette.lightGray,
    fontWeight: 500,
    cursor: "pointer",
    margin: "0 0 20px 12px",
  },

  title: {
    fontSize: 19,
    color: theme.palette.lightGray,
    fontWeight: 500,
    marginLeft: 24,
  },

  inputName: {
    display: "flex",
    flexDirection: "row",
    width: 300,
  },

  containerAction: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginTop: 8,
  },

  errorMessage: {
    color: theme.palette.errorRed,
    fontSize: 14,
    margin: 0,
  },
}));

export { useStyles };
