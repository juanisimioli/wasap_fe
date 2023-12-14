"use client";
import Bubble from "@/components/ChatArea/Bubble/Bubble";
import { useRef, useEffect, useState } from "react";
import { useStyles } from "./styles";
import { useWasapContext } from "@/contexts/useWasapContext";
import DateOnChat from "../DateOnChat/DateOnChat";
import FabGoToBottom from "../FabGoToBottom/FabGoToBottom";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { getAddress } from "ethers";

const Chat = () => {
  const { classes } = useStyles();
  const { chat } = useWasapContext();
  const [isScrolledToBottom, SetIsScrolledToBottom] = useState(null);
  const chatRef = useRef(null);
  const { wallet } = useMetamaskContext();
  const { address } = wallet;

  useEffect(() => {
    // Scroll to the bottom of the specific div
    if (chatRef.current) {
      goToBottom();
    }
  }, []);

  const checkHeight = () => {
    const isBottom =
      (chatRef.current.scrollHeight - chatRef.current.clientHeight) * 0.95 <
      chatRef.current.scrollTop;

    if (isBottom) SetIsScrolledToBottom(true);
    if (!isBottom && isScrolledToBottom) SetIsScrolledToBottom(false);
  };

  const goToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  return (
    <>
      <div ref={chatRef} onScroll={checkHeight} className={classes.chat}>
        {chat.map((messagesGroupedByDate, idx) => (
          <div key={`msgsByDate_${idx}`}>
            <DateOnChat date={messagesGroupedByDate.date} />

            {messagesGroupedByDate.groups?.map(
              (messagesGroupedByContiguousSender, idx) => (
                <div className={classes.groupSender} key={`groupBubble_${idx}`}>
                  {messagesGroupedByContiguousSender.map(
                    ({ text, sender, time }, idx) => (
                      <Bubble
                        key={`bubble_${idx}`}
                        text={text}
                        isSender={getAddress(sender) === getAddress(address)}
                        isFirstMsgGroup={!idx}
                        time={time}
                        status={sender === address ? 2 : null}
                      />
                    )
                  )}
                </div>
              )
            )}
          </div>
        ))}
      </div>

      <FabGoToBottom
        handleClick={goToBottom}
        isScrolledToBottom={isScrolledToBottom}
      />
    </>
  );
};

export default Chat;
