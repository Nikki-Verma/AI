"use client";

import ChatBot from "@/components/ChatBot";
import PlaygroundChatConfiguration from "@/components/PlaygroundChatConfiguration";
import { PlaygroundConfigurationOptionType } from "@/components/PlaygroundChatConfiguration/constant";
import useChatStream from "@/Hooks/useChatStream";
import { useAppStore } from "@/store";
import { UnknownObject } from "@/utils/types";
import { Result } from "antd";
import { useEffect, useState } from "react";
import { NoChatConatiner, PlaygroundContainer } from "./style";

type Props = {
  params: {
    id: string;
  };
};

function ChatPage() {
  const { updatePageConfig } = useAppStore();
  const [selectedChatConfigDetails, setSelectedChatConfigDetails] = useState<
    UnknownObject | undefined
  >();

  const [selectedChatConfigId, setSelectedChatConfigId] = useState<
    undefined | string
  >();
  const [selectedTab, setSelectedTab] =
    useState<PlaygroundConfigurationOptionType>(
      PlaygroundConfigurationOptionType.WORKFLOW,
    );
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    chatStreaming,
    setInput,
    changeConversation,
    changeConversationLoading,
    stopStream,
    setChatConfig,
    chatConfig,
  } = useChatStream({
    chatConfig: {
      model: "",
      language_code: "EN",
      source: "APP",
      app_id: "",
      model_id: "",
    },
  });

  useEffect(() => {
    if (selectedChatConfigId) {
      if (selectedTab === PlaygroundConfigurationOptionType.WORKFLOW) {
        setChatConfig({
          model: selectedChatConfigDetails?.pipeline_name,
          language_code: "EN",
          source: "APP",
          app_id: selectedChatConfigDetails?.pipeline_id,
          model_id: selectedChatConfigDetails?.pipeline_id,
        });
      } else if (selectedTab === PlaygroundConfigurationOptionType.AGENT) {
        setChatConfig({
          model: selectedChatConfigDetails?.agent_name,
          language_code: "EN",
          source: "APP",
          app_id: selectedChatConfigDetails?.pipeline_id,
          model_id: selectedChatConfigDetails?.pipeline_id,
        });
      }
    }
  }, [selectedChatConfigId]);

  useEffect(() => {
    setSelectedChatConfigId(undefined);
    setSelectedChatConfigDetails(undefined);
  }, [selectedTab]);

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Playground",
      pageDescription: " Playground description",
    });
  }, []);

  return (
    <PlaygroundContainer>
      <div style={{ height: "100%", flex: 1 }}>
        {selectedChatConfigId ? (
          <ChatBot
            messages={messages}
            changeConversationLoading={changeConversationLoading}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            chatStreaming={chatStreaming}
            stopStream={stopStream}
            WelcomeMessage=""
          />
        ) : (
          <NoChatConatiner>
            <Result
              status={403}
              title="No Workflow/Agent selected"
              subTitle="Please Select a workflow/agent to start a conversation"
            />
          </NoChatConatiner>
        )}
      </div>
      <div style={{ height: "100%", width: "30%" }}>
        <PlaygroundChatConfiguration
          selectedChatConfigId={selectedChatConfigId}
          setSelectedChatConfigId={setSelectedChatConfigId}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedChatConfigDetails={selectedChatConfigDetails}
          setSelectedChatConfigDetails={setSelectedChatConfigDetails}
          changeConversation={changeConversation}
        />
      </div>
    </PlaygroundContainer>
  );
}

export default ChatPage;
