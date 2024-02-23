"use client";

import ChatBot from "@/components/ChatBot";
import ChatHistory from "@/components/ChatHistory";
import useChatStream from "@/Hooks/useChatStream";
import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { DashboardContainer } from "./style";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage() {
  const { updatePageConfig } = useAppStore();
  const [conversationId, setConversationId] = useState<string | undefined>();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    changeConversation,
    changeConversationLoading,
    stopStream,
  } = useChatStream({
    chatConfig: {
      model: "OpenAI-GPT-3.5",
      language_code: "EN",
      source: "APP",
      app_id: "65cb90d0444d8dd56b28db09",
      model_id: "65cb90d0444d8dd56b28db09",
    },
    convId: conversationId,
  });

  useEffect(() => {
    changeConversation(conversationId);
  }, [conversationId]);

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Dashboard",
      pageDescription: " Dashboard description",
    });
  }, []);

  return (
    <DashboardContainer>
      <div style={{ height: "100%", flex: 1 }}>
        <ChatBot
          messages={messages}
          changeConversationLoading={changeConversationLoading}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
        />
      </div>
      <div style={{ height: "100%", width: "20%" }}>
        <ChatHistory
          setConversationId={setConversationId}
          conversationId={conversationId}
        />
      </div>
    </DashboardContainer>
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
//       <Link prefetch href={"/"}>Landing page</Link>
//     </div>
//   );
// };

// export default Dashboard;
