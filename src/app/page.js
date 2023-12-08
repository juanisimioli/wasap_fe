"use client";
import ChatArea from "@/components/ChatArea/ChatArea";
import ConnectArea from "@/components/ConnectArea/ConnectArea";
import ContactsArea from "@/components/ContactsArea/ContactsArea";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <ConnectArea />
      {/* <ContactsArea />
      <ChatArea /> */}
    </div>
  );
}
