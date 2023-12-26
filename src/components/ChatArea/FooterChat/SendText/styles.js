import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  containerIconEther: {
    maxHeight: 40,
    marginTop: 8,
  },

  iconSendText: {
    color: theme.palette.grayBlue,
    margin: 8,
    cursor: "pointer",
  },

  containerIconEther: {
    maxHeight: 40,
    marginTop: 8,
  },

  iconEther: {
    "& path": {
      fill: theme.palette.grayBlue,
    },
    "&:hover": {
      path: {
        fill: theme.palette.blueish,
      },
    },

    cursor: "pointer",
  },

  clearIcon: {
    color: theme.palette.grayBlue,
    cursor: "pointer",
    width: 24,

    "&:hover": {
      color: theme.palette.errorRed,
    },
  },
}));

export { useStyles };
