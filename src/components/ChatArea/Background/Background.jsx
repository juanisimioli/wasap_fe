import { useStyles } from "./styles";

const Background = () => {
  const { classes } = useStyles();
  return <div className={classes.background} />;
};

export default Background;
