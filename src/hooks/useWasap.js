import { useState } from "react";
import { calculateChat } from "@/utils/utils";
import { mockedMessages } from "@/mocked";

const useWasap = () => {
  const [messages, setMessages] = useState([...mockedMessages]);
  const [chat, setChat] = useState(calculateChat(messages));

  return {
    chat,
  };
};

export default useWasap;
