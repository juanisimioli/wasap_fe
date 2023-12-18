import Image from "next/image";
import { Add } from "@mui/icons-material";
import { useWasapContext } from "@/contexts/useWasapContext";
import { getUrlAvatar } from "@/utils/utils";
import { useStyles } from "./styles";

const Header = () => {
  const { classes } = useStyles();
  const {
    userInfo,
    setIsAddContactOpened,
    isAddContactOpened,
    isEditUserOpened,
    setIsEditUserOpened,
  } = useWasapContext();

  const handleOpenAddContact = () => {
    setIsAddContactOpened(true);
  };

  const handleOpenEditUser = () => {
    setIsEditUserOpened(true);
  };

  if (isAddContactOpened || isEditUserOpened) return null;

  return (
    <header className={classes.header}>
      <div className={classes.content}>
        <div className={classes.avatar} onClick={handleOpenEditUser}>
          <Image
            src={getUrlAvatar(userInfo?.avatar)}
            width={40}
            height={40}
            alt="avatar"
          />
        </div>
        <div className={classes.addIcon}>
          <Add onClick={handleOpenAddContact} />
        </div>
      </div>
    </header>
  );
};

export default Header;
