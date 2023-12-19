"use client";
import { useRef, useEffect, useState } from "react";
import { getAddress } from "ethers";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useWasapContext } from "@/contexts/useWasapContext";
import Bubble from "@/components/ChatArea/Bubble/Bubble";
import DateOnChat from "../DateOnChat/DateOnChat";
import FabGoToBottom from "../FabGoToBottom/FabGoToBottom";
import { useStyles } from "./styles";

const Chat = () => {
  const { classes } = useStyles();
  const { chat } = useWasapContext();
  const [isScrolledToBottom, SetIsScrolledToBottom] = useState(null);
  const [isFabOnScreen, setIsFabOnScreen] = useState(null);
  const chatRef = useRef(null);
  const { wallet } = useMetamaskContext();
  const { address } = wallet;

  useEffect(() => {
    // Scroll to the bottom of the specific div
    if (chatRef.current) {
      goToBottom();
    }
  }, [chat]);

  const checkHeight = () => {
    const { current } = chatRef;
    const { scrollHeight, clientHeight, scrollTop } = current;

    const isBottom = (scrollHeight - clientHeight) * 0.95 < scrollTop;
    const renderFabOnScreen = scrollHeight !== clientHeight;

    setIsFabOnScreen(renderFabOnScreen);

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
                    ({ text, sender, time, status }, idx) => (
                      <Bubble
                        key={`bubble_${idx}`}
                        text={text}
                        isSender={getAddress(sender) === getAddress(address)}
                        isFirstMsgGroup={!idx}
                        time={time}
                        status={status}
                      />
                    )
                  )}
                </div>
              )
            )}
          </div>
        ))}
      </div>

      {isFabOnScreen && (
        <FabGoToBottom
          handleClick={goToBottom}
          isScrolledToBottom={isScrolledToBottom}
        />
      )}
    </>
  );
};

export default Chat;
