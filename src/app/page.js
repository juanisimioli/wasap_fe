"use client";
import ChatArea from "@/components/ChatArea/ChatArea";
import ConnectArea from "@/components/ConnectArea/ConnectArea";
import ContactsArea from "@/components/ContactsArea/ContactsArea";
import LoaderApp from "@/components/Utils/LoaderApp/LoaderApp";
import { useMetamaskContext } from "@/contexts/useMetamaskContext";

export default function Home() {
  const { isMetamask, isConnecting, wallet, isAllowedChainId } =
    useMetamaskContext();
  const { address } = wallet;

  const isUserRegistered = false;

  return (
    <div style={{ display: "flex" }}>
      {isConnecting ? (
        <LoaderApp />
      ) : isMetamask && address && isAllowedChainId && isUserRegistered ? (
        <>
          <ContactsArea />
          <ChatArea />
        </>
      ) : (
        <ConnectArea />
      )}
    </div>
  );
}
