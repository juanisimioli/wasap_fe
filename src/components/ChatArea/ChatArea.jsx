"use client";
import Background from "@/components/ChatArea/Background/Background";
import HeaderChat from "@/components/ChatArea/HeaderChat/HeaderChat";
import Chat from "@/components/ChatArea/Chat/Chat";
import FooterChat from "@/components/ChatArea/FooterChat/FooterChat";
import { useStyles } from "./styles";

const ChatArea = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Background />
        <HeaderChat />
        <Chat />
        <FooterChat />
      </div>
    </div>
  );
};

export default ChatArea;
