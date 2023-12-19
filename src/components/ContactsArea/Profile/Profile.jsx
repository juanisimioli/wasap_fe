import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useWasapContext } from "@/contexts/useWasapContext";
import Input from "@/components/Utils/Input/Input";
import ButtonWithLoader from "@/components/Utils/ButtonWithLoader/ButtonWithLoader";
import AvatarEdit from "@/components/Utils/AvatarEdit/AvatarEdit";
import { uploadFileToIpfs } from "@/utils/ipfs";
import { useStyles } from "./styles";

const Profile = () => {
  const { classes } = useStyles();

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const { setIsProfileOpen, userInfo, updateUserInfo, isUpdatingUserInfo } =
    useWasapContext();
  const { name, avatar } = userInfo;

  const [nameUser, setNameUser] = useState(name);
  const [avatarUser, setAvatarUser] = useState(avatar);

  const reset = () => {
    setNameUser(name);
    setAvatarUser(avatar);
  };

  const handleSaveInfo = () => {
    if (nameUser.length === 0) {
      setError("User name cannot be empty");
      return;
    }

    updateUserInfo(avatarUser, nameUser);
  };

  const handleChangeNameUser = ({ target }) => {
    const { value } = target;
    setNameUser(value);
  };

  const uploadFile = async (file) => {
    setError("");
    setIsUploading(true);

    try {
      const ipfsHash = await uploadFileToIpfs(file, setError);
      setAvatarUser(ipfsHash);
    } catch (e) {
      setError("Cannot update image");
      console.error(e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseEditUser = () => {
    reset();
    setIsProfileOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <ArrowBack className={classes.backIcon} onClick={handleCloseEditUser} />
        <p className={classes.title}>Profile</p>
      </div>

      <div className={classes.contentContainer}>
        <AvatarEdit
          isUploading={isUploading}
          avatar={avatarUser}
          onEditAvatar={uploadFile}
        />

        <div className={classes.inputName}>
          <Input
            placeholder="Name"
            value={nameUser}
            onChange={handleChangeNameUser}
            fontSize={16}
            maxLength={25}
          />
        </div>

        <p className={classes.errorMessage}>{error}</p>

        <div className={classes.containerAction}>
          <ButtonWithLoader
            title="Save"
            disabled={nameUser.length === 0}
            onClick={handleSaveInfo}
            isLoading={isUpdatingUserInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
