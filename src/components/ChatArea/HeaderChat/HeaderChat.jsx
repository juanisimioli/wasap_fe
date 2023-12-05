import { useStyles } from "./styles";

const HeaderChat = () => {
  const { classes } = useStyles();
  return <header className={classes.header}></header>;
};

export default HeaderChat;
