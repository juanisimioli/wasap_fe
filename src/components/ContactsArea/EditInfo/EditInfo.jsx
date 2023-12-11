import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import Input from "@/components/Utils/Input/Input";
import { useStyles } from "./styles";
import { CircularProgress } from "@mui/material";
import AvatarEdit from "@/components/Utils/AvatarEdit/AvatarEdit";
import { uploadFileToIpfs } from "@/utils/ipfs";

const AddUser = () => {
  const { classes } = useStyles();
  const [nameUser, setNameUser] = useState("");
  const [cid, setCid] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleSaveInfo = () => {};

  const uploadFile = async (file) => {
    setError("");
    setIsUploading(true);
    if (file?.size > 205000) setError("Image must be lower than 200kb");

    try {
      const ipfsHash = await uploadFileToIpfs(file);
      setCid(ipfsHash);
    } catch (e) {
      setError("Cannot update image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <ArrowBack className={classes.backIcon} />
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
            onChange={setNameUser}
            fontSize={16}
          />
        </div>

        <p className={classes.errorMessage}>{error}</p>

        <div className={classes.containerAction}>
          <button className={classes.saveButton} onClick={handleSaveInfo}>
            Save
          </button>
          {true && <CircularProgress size={24} className={classes.loader} />}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
