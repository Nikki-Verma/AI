"use client";

import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DUMMY_SELLER_ID,
  DUMMY_SELLER_PROFILE_ID,
  X_SELLER_ID,
  X_SELLER_PROFILE_ID,
} from "@/utils/constants";
import { Col, Empty, Row, Spin } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import {
  ChatHeader,
  ChatHistoryText,
  ChatHistoryTextContainer,
  Container,
  HistoryDivider,
} from "./style";

type ChatHistoryProps = {
  setConversationId: (convId: string | undefined) => void;
  conversationId: string | undefined;
};

const initialFilters = (dynamicState: any = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const ChatHistory = ({
  setConversationId,
  conversationId,
}: ChatHistoryProps) => {
  const { data: session }: any = useSession();
  const [listData, setListData] = useState<any[]>([]);

  const [filters, setFilters] = useState({ ...initialFilters() });
  const [prompt, setPrompt] = useState("");

  const { data, error, isLoading, isFetching, isError } = useFetchData(
    config.intract.chatHistoryList,
    { ...filters, userId: session?.user?.details?.id },
    {
      [X_SELLER_ID]: DUMMY_SELLER_ID,
      [X_SELLER_PROFILE_ID]: DUMMY_SELLER_PROFILE_ID,
    },
  );

  useEffect(() => {
    if (data?.result?.response) {
      setListData((prev: any) => [...prev, ...(data?.result?.response || {})]);
    } else if (isError) {
      setListData([]);
    }
  }, [data]);

  const loadMoreData = () => {
    if (!isLoading && !isFetching) {
      setFilters((prevState: any) => ({
        ...prevState,
        page: prevState.page + 1,
      }));
    }
  };

  return (
    <Container>
      <ChatHeader>Recent Chats</ChatHeader>
      <HistoryDivider />
      <div
        style={{
          height: "100%",
          overflow: "auto",
        }}
      >
        {listData?.length < 1 && !isLoading && !isFetching ? (
          <Empty description="Start a new chat to be displayed here" />
        ) : (
          listData?.map((list: any, index: number) => (
            <ChatHistoryTextContainer
              key={list?.cid}
              onClick={() => setConversationId(list?.cid)}
            >
              <ChatHistoryText ellipsis>{list?.message}</ChatHistoryText>
            </ChatHistoryTextContainer>
          ))
        )}
        {(isLoading || isFetching) && (
          <Row justify="center">
            <Col>
              <Spin spinning />
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default ChatHistory;
