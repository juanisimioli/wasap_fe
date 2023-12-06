import { useStyles } from "./styles";
import Image from "next/image";

const Header = () => {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.content}>
        <div className={classes.avatar}>
          <Image src={"/juani.png"} width={40} height={40} alt="avatar" />
        </div>
        <div>I</div>
      </div>
    </header>
  );
};

export default Header;
