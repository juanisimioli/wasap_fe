import Bubble from "@/components/ChatArea/Bubble/Bubble";
import { useRef, useEffect } from "react";
import { useStyles } from "./styles";
import { useWasapContext } from "@/contexts/useWasapContext";
import DateOnChat from "../DateOnChat/DateOnChat";

const Chat = () => {
  const { classes } = useStyles();
  const ref = useRef(null);

  const { chat } = useWasapContext();

  const scrollToLastFruit = () => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView();
  };

  useEffect(() => {
    scrollToLastFruit();
  }, []);

  const userAddress = "0x01"; // TODO: traer de metamask

  return (
    <div ref={ref} className={classes.chat}>
      {chat.map((groupedChat, i) => {
        console.log(groupedChat.date);

        return (
          <>
            <div
              key={`xxx_${i}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <DateOnChat date={groupedChat.date} />
            </div>
            {groupedChat.groups?.map((gr) => (
              <div style={{ marginBottom: 12 }}>
                {gr.map(({ msg, sender, time }, index) => (
                  <Bubble
                    key={`bubble_${index}`}
                    message={msg}
                    isSender={sender === userAddress}
                    isFirstMsgGroup={!index}
                    time={time}
                    status={sender === userAddress ? 2 : null}
                  />
                ))}
              </div>
            ))}
          </>
        );
      })}
    </div>
  );
};

export default Chat;
