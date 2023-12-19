import { useRef } from "react";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { CameraAlt } from "@mui/icons-material/";
import { getUrlAvatar } from "@/utils/utils";
import { useStyles } from "./styles";

const AvatarEdit = ({ isUploading, onEditAvatar, avatar }) => {
  const inputFile = useRef(null);

  const { classes } = useStyles({ isUploading });

  const handleClickAvatar = () => {
    if (isUploading) return;
    inputFile.current.click();
  };

  const handleAvatarChange = (e) => {
    onEditAvatar(e.target.files?.[0]);
  };

  return (
    <>
      <input
        type="file"
        name="file"
        accept="image/*"
        ref={inputFile}
        className={classes.none}
        onChange={handleAvatarChange}
      />
      <div onClick={handleClickAvatar} className={classes.upload}>
        {isUploading ? (
          <CircularProgress size={24} className={classes.loader} />
        ) : (
          <>
            <div className={classes.uploadArea}>
              <CameraAlt />
              <div className={classes.uploadText}>CHANGE PROFILE PHOTO</div>
            </div>
            <Image
              priority
              src={getUrlAvatar(avatar)}
              width={150}
              height={150}
              alt="avatar"
            />
          </>
        )}
      </div>
    </>
  );
};

export default AvatarEdit;
