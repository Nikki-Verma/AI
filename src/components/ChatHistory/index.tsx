"use client";

import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  X_SELLER_ID,
  X_SELLER_PROFILE_ID,
} from "@/utils/constants";
import { Col, Empty, Row, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";

import {
  ChatHeader,
  ChatHistoryText,
  ChatHistoryTextContainer,
  Container,
  HistoryDivider,
  NewChatButton,
  HistayDay, 
  LoaderContainer
} from "./style";
import { PlusOutlined } from "@ant-design/icons";
import MessageIcon from "../Icons/MessageIcon";

type ChatHistoryProps = {
  setConversationId: (convId: string | undefined) => void;
  conversationId: string | undefined;
  changeConversation: (val: string | undefined) => void
};

const initialFilters = (dynamicState: any = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const ChatHistory = ({
  setConversationId,
  conversationId,
  changeConversation
}: ChatHistoryProps) => {
  const { data: session, status }: any = useSession();

  const [filters, setFilters] = useState({ ...initialFilters() });
  const [prompt, setPrompt] = useState("");

  const { data, error, isLoading, isError } = useFetchData(
    config.intract.chatHistoryList,
    { ...filters, userId: session?.user?.details?.id },
    {
      [X_SELLER_ID]: session?.user?.details?.id,
      [X_SELLER_PROFILE_ID]: session?.user?.details?.id,
    },
  );

  return (
    <Container>
      <div style={{
        padding: '20px 16px'
      }}>
        {!isLoading && 
        <NewChatButton 
          icon={<PlusOutlined />}
          shape="round"
          onClick={() => changeConversation(undefined)}
        >
          New Chat
        </NewChatButton>
        }
        <div
          style={{
            height: "calc(100% - 100px)",
            overflow: "auto",
          }}
        >
          <HistayDay>Today</HistayDay>
          {data?.result?.response?.length < 1 && !isLoading ? (
            <Empty description="Start a new chat to be displayed here" />
          ) : (
            data?.result?.response?.map((list: any, index: number) => (
              <ChatHistoryTextContainer
                key={list?.cid}
                onClick={() => setConversationId(list?.cid)}
              >
                  <MessageIcon /> 
                <ChatHistoryText ellipsis>{list?.message}</ChatHistoryText>
              </ChatHistoryTextContainer>
            ))
          )}          
        </div>
        {isLoading && (
            <LoaderContainer>
              <Row justify="center">
                <Col>
                  <Spin spinning />
                </Col>
              </Row>
            </LoaderContainer>
          )}     
      </div>
    </Container>
  );
};

export default ChatHistory;
