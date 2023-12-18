"use client";
import ChatArea from "@/components/ChatArea/ChatArea";
import EmptyChat from "@/components/ChatArea/EmptyChat/EmptyChat";
import ConnectArea from "@/components/ConnectArea/ConnectArea";
import ContactsArea from "@/components/ContactsArea/ContactsArea";
import LoaderApp from "@/components/Utils/LoaderApp/LoaderApp";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useWasapContext } from "@/contexts/useWasapContext";
import { useStyles } from "./styles";

const App = () => {
  const { isMetamask, isConnecting, wallet, isAllowedChainId } =
    useMetamaskContext();
  const { address } = wallet;
  const { isUserRegistered, contactSelected } = useWasapContext();
  const { classes } = useStyles();

  return (
    <div className={classes.a}>
      <div className={classes.container}>
        {isConnecting ||
        (address && isUserRegistered === null && isAllowedChainId) ? (
          <LoaderApp />
        ) : isMetamask && address && isAllowedChainId && isUserRegistered ? (
          <>
            <ContactsArea />
            {contactSelected ? <ChatArea /> : <EmptyChat />}
          </>
        ) : (
          <ConnectArea />
        )}
      </div>
    </div>
  );
};

export default App;
