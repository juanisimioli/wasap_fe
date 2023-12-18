import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { Edit, Clear, Check } from "@mui/icons-material";
import { useWasapContext } from "@/contexts/useWasapContext";
import { getUrlAvatar } from "@/utils/utils";
import { useStyles } from "./styles";

const HeaderChat = () => {
  const { classes } = useStyles();
  const { contactSelectedData, isUpdatingContactName, updateContactName } =
    useWasapContext();
  const { name, avatar } = contactSelectedData;

  const inputRef = useRef(null);

  const [isUpdateContactNameEnabled, setIsUpdateContactNameEnabled] =
    useState(false);

  const [contactName, setContactName] = useState(name);

  const handleClickContactName = () => {
    setIsUpdateContactNameEnabled(true);
  };

  const handleInputChange = ({ target }) => {
    const { value } = target;
    setContactName(value);
  };

  const handleKeyDown = () => {
    // TODO
  };

  const handleBlur = (e) => {
    setContactName(name);
    setIsUpdateContactNameEnabled(false);
  };

  const handleConfirmChangeName = async (e) => {
    setIsUpdateContactNameEnabled(false);
    if (contactName.length === 0) {
      setContactName(name);
      return;
    }

    await updateContactName(contactName);
  };

  const handleCancelChangeName = () => {
    setContactName(name);
    setIsUpdateContactNameEnabled(false);
  };

  useEffect(() => {
    setContactName(name);
    setIsUpdateContactNameEnabled(false);
  }, [name]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // Clicked outside the input, trigger blur event
        handleBlur();
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [inputRef, handleBlur]);

  return (
    <header className={classes.header}>
      <div className={classes.avatar}>
        <Image
          src={getUrlAvatar(avatar)}
          width={40}
          height={40}
          alt="avatar"
          priority
        />
      </div>
      <div
        className={classes.nameEditContainer}
        onClick={handleClickContactName}
      >
        <input
          ref={inputRef}
          className={classes.inputName}
          value={contactName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          maxLength={25}
        />
        <span className={classes.spanName}>{contactName}</span>
      </div>
      <Edit className={classes.editContactNameIcon} />
      {isUpdateContactNameEnabled && !isUpdatingContactName && (
        <div className={classes.icons}>
          <Check
            className={classes.checkIcon}
            onClick={handleConfirmChangeName}
          />
          <Clear
            className={classes.clearIcon}
            onClick={handleCancelChangeName}
          />
        </div>
      )}
      {isUpdatingContactName && (
        <CircularProgress size={20} className={classes.loader} />
      )}
    </header>
  );
};

export default HeaderChat;
