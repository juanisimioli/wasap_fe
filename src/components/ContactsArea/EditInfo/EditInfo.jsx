import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useWasapContext } from "@/contexts/useWasapContext";
import Input from "@/components/Utils/Input/Input";
import AvatarEdit from "@/components/Utils/AvatarEdit/AvatarEdit";
import { uploadFileToIpfs } from "@/utils/ipfs";
import { useStyles } from "./styles";

const AddUser = () => {
  const { classes } = useStyles();

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const { setIsEditUserOpened, userInfo, updateUserInfo, isUpdatingUserInfo } =
    useWasapContext();
  const { name, avatar } = userInfo;

  const [nameUser, setNameUser] = useState(name);
  const [cid, setCid] = useState(avatar);

  const reset = () => {
    setNameUser(name);
    setCid(avatar);
  };

  const handleSaveInfo = () => {
    if (nameUser.length === 0) {
      setError("User name cannot be empty");
      return;
    }

    updateUserInfo(cid, nameUser);
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
      setCid(ipfsHash);
    } catch (e) {
      setError("Cannot update image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseEditUser = () => {
    reset();
    setIsEditUserOpened(false);
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
          cid={cid}
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
          <button
            className={classes.saveButton}
            onClick={handleSaveInfo}
            disabled={isUpdatingUserInfo}
          >
            {isUpdatingUserInfo ? (
              <CircularProgress size={24} className={classes.loader} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
