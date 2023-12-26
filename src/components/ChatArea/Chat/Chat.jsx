"use client";
import { useRef } from "react";
import { getAddress } from "ethers";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useWasapContext } from "@/contexts/useWasapContext";
import Text from "@/components/ChatArea/Bubble/Text/Text";
import Payment from "../Bubble/Payment/Payment";
import DateOnChat from "../DateOnChat/DateOnChat";
import FabGoToBottom from "../FabGoToBottom/FabGoToBottom";
import useGoToBottom from "@/hooks/useGoToBottom";
import { useStyles } from "./styles";

const Chat = () => {
  const { classes } = useStyles();
  const { chat } = useWasapContext();
  const { wallet } = useMetamaskContext();
  const { address } = wallet;
  const chatRef = useRef(null);
  const { isFabOnScreen, checkHeight, goToBottom, isScrolledToBottom } =
    useGoToBottom(chatRef, chat);

  const renderTextOrPayment = ({ text, amount, sender, time, status }, idx) => {
    let message;

    switch (true) {
      case Boolean(text):
        message = (
          <Text
            key={`bubble_text_${idx}`}
            text={text}
            isSender={getAddress(sender) === getAddress(address)}
            isFirstMsgGroup={!idx}
            time={time}
            status={status}
          />
        );
        break;
      case Boolean(amount):
        message = (
          <Payment
            key={`bubble_payment_${idx}`}
            amount={amount}
            isSender={getAddress(sender) === getAddress(address)}
            isFirstMsgGroup={!idx}
            time={time}
            status={status}
          />
        );
        break;
      default:
        message = null;
    }

    return message;
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
                  {messagesGroupedByContiguousSender.map(renderTextOrPayment)}
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
