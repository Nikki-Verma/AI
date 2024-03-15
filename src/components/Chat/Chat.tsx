"use client";

import { ChatMessage } from "@/Hooks/useChatStream";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

import { Col, Row, Skeleton } from "antd";

import Message from "./Message";
import { ChatContainer, GetStartedText } from "./style";

type Props = {
  messages: ChatMessage[];
  loading: boolean;
  chatLoading: boolean;
  WelcomeMessage: string;
  chatStreaming: boolean;
};

function Chat({
  messages,
  loading,
  chatLoading,
  WelcomeMessage,
  chatStreaming,
}: Props) {
  const { data: session } = useSession();
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages, loading]);

  return (
    <ChatContainer>
      {messages?.length < 1 && (
        <Skeleton avatar active loading={chatLoading}>
          <Row
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <GetStartedText>{WelcomeMessage}</GetStartedText>
            </Col>
          </Row>
        </Skeleton>
      )}
      {messages?.map((message, index) => (
        <Message
          key={message.id}
          message={message}
          loading={
            index === messages?.length - 1 &&
            loading &&
            message?.role !== "user"
          }
          chatStreaming={chatStreaming}
        />
      ))}
      <div ref={messageEndRef} />
    </ChatContainer>
  );
}

export default Chat;
