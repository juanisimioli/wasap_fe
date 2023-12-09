import { useStyles } from "./styles";
import Image from "next/image";
import { Add, Edit } from "@mui/icons-material";

const Header = () => {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.content}>
        <div className={classes.avatar}>
          <Image
            src={"/default-user.svg"}
            width={40}
            height={40}
            alt="avatar"
          />
        </div>
        <div className={classes.addIcon}>
          <Add />
        </div>
      </div>
    </header>
  );
};

export default Header;
