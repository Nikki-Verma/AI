"use client";

import Chat from "@/components/Chat/Chat";
import ChatInput from "@/components/Chat/ChatInput";
import useChatStream from "@/Hooks/useChatStream";
import { useAppStore } from "@/store";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  const { updatePageConfig } = useAppStore();

  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    setInput,
    stopStream,
    conversationId,
    setConversationId,
  } = useChatStream({});

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Dashboard",
      pageDescription: " Dashboard description",
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col h-screen overflow-hidden"
    >
      <Chat messages={messages} chatId={id} />
      <ChatInput
        submitHandler={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
        setInput={setInput}
        loading={isLoading}
        chatId={id}
      />
    </motion.div>
  );
}

export default ChatPage;

// ("use client");

// import { useAppStore } from "@/store";
// import { Button } from "antd";
// import { signOut } from "next-auth/react";
// import Link from "next/link";
// import { useEffect } from "react";

// type Props = {};

// const Dashboard = (props: Props) => {
//   const { updatePageConfig } = useAppStore();
//   useEffect(() => {
//     updatePageConfig({
//       pageTitle: "Dashboard",
//       pageDescription: " Dashboard description",
//     });
//   }, []);

//   return (
//     <div style={{ height: "200vh" }}>
//       Dashboard
//       <Button onClick={() => signOut({ redirect: false })}>Sign out</Button>
//       <Link href={"/"}>Landing page</Link>
//     </div>
//   );
// };

// export default Dashboard;
