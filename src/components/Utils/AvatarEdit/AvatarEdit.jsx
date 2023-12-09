import { useRef } from "react";
import { CircularProgress } from "@mui/material";
import { CameraAlt } from "@mui/icons-material/";
import { useStyles } from "./styles";
import Image from "next/image";

const AvatarEdit = ({ isUploading, onEditAvatar, cid }) => {
  const inputFile = useRef(null);

  const { classes } = useStyles({ isUploading });

  const handleClickAvatar = () => {
    if (isUploading) return;
    inputFile.current.click();
  };

  const handleAvatarChange = (e) => {
    onEditAvatar(e.target.files?.[0]);
  };

  const avatarUrl = cid
    ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_TOKEN}`
    : "/default-user.svg";

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
              src={avatarUrl}
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
