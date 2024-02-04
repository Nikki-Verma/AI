"use client";

import { ChatMessage } from "@/Hooks/useChatStream";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

import Message from "./Message";
import { ChatContainer, GetStartedText, WelcomeText } from "./style";
import { Col, Row } from "antd";
import Image from "next/image";

type Props = {
  messages: ChatMessage[];
};

function Chat({ messages }: Props) {
  const { data: session } = useSession();
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <ChatContainer>
      {messages?.length < 1 && (
        <Row style={{display : 'flex',width : '100%',justifyContent : 'center'}}>
            <Col span={18} style={{display : 'flex',flexDirection : 'column',alignItems : 'center'}}>
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
            Welcome to Assistant by <a style={{color : '#602EDF'}}>Simplai.ai</a>
            </WelcomeText>
            <GetStartedText>
            Get started by writing a task and Assistant can do the rest. Not sure where to start? Check out the Prompt Library for inspiration.
            </GetStartedText>
            </Col>
        </Row>
      )}
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messageEndRef} />
    </ChatContainer>
  );
}

export default Chat;
