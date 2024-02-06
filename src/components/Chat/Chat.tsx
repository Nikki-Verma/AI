"use client";

import { ChatMessage } from "@/Hooks/useChatStream";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

import { Col, Row, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import Message from "./Message";
import { ChatContainer, GetStartedText, WelcomeText } from "./style";

type Props = {
  messages: ChatMessage[];
  loading: boolean;
  chatLoading: boolean;
};

function Chat({ messages, loading, chatLoading }: Props) {
  const { data: session } = useSession();
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <ChatContainer>
      {messages?.length < 1 && (
        <Skeleton avatar active loading={chatLoading}>
          <Row
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Col
              span={18}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  "/assets/Logos/simplaiLogo.svg"
                }
                height={47}
                width={47}
                alt=""
              />
              <WelcomeText>
                Welcome to Assistant by{" "}
                <Link href="" style={{ color: "#602EDF" }}>
                  {"        "}
                  SimplAI.ai
                </Link>
              </WelcomeText>
              <GetStartedText>
                Get started by writing a task and Assistant can do the rest. Not
                sure where to start? Check out the Prompt Library for
                inspiration.
              </GetStartedText>
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
            message?.role === "SimplAi"
          }
        />
      ))}
      <div ref={messageEndRef} />
    </ChatContainer>
  );
}

export default Chat;
