import { useStyles } from "./styles";
import Image from "next/image";
import { Add, Edit } from "@mui/icons-material";
import { getUrlAvatar } from "@/utils/utils";
import { useWasapContext } from "@/contexts/useWasapContext";

const Header = () => {
  const { classes } = useStyles();
  const { userInfo } = useWasapContext();

  return (
    <header className={classes.header}>
      <div className={classes.content}>
        <div className={classes.avatar}>
          <Image
            src={getUrlAvatar(userInfo?.avatar)}
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
