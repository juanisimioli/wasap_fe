"use client";
import ChatArea from "@/components/ChatArea/ChatArea";
import EmptyChat from "@/components/ChatArea/EmptyChat/EmptyChat";
import ConnectArea from "@/components/ConnectArea/ConnectArea";
import ContactsArea from "@/components/ContactsArea/ContactsArea";
import LoaderApp from "@/components/Utils/LoaderApp/LoaderApp";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";
import { useWasapContext } from "@/contexts/useWasapContext";

export default function Home() {
  const { isMetamask, isConnecting, wallet, isAllowedChainId } =
    useMetamaskContext();
  const { address } = wallet;
  const { isUserRegistered, contactSelected } = useWasapContext();

  // TODO: return must be something like <App />

  return (
    <div style={{ display: "flex" }}>
      {isConnecting || (address && isUserRegistered === null) ? (
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
  );
}
