"use client";
import ChatArea from "@/components/ChatArea/ChatArea";
import ContactsArea from "@/components/ContactsArea/ContactsArea";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <ContactsArea />
      <ChatArea />
    </div>
  );
}
