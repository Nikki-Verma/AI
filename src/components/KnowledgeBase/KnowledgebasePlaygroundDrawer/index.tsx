import { getKbPlaygroundResponseApi } from "@/api/knowledgebase";
import Chat from "@/components/Chat/Chat";
import ChatInput from "@/components/Chat/ChatInput";
import { ChatMessage } from "@/Hooks/useChatStream";
import { UnknownObject } from "@/utils/types";
import { Button, Drawer, Space } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { KbPlaygroundContainer } from "./style";

type KnowledgebasePlaygroundDrawerProps = {
  open: boolean;
  onClose: () => void;
  kbDetails: UnknownObject;
};

const KB_ERROR_MESSAGE =
  "Something went wrong fetching knowledge base response.";

const KnowledgebasePlaygroundDrawer = ({
  open,
  onClose,
  kbDetails,
}: KnowledgebasePlaygroundDrawerProps) => {
  const { data: session }: any = useSession();
  const closeDrawer = () => {
    onClose();
    setMessages([]);
    setInput("");
    setLoading(false);
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addMessageToChat = (
    message: string,
    role: ChatMessage["role"] = "user",
  ) => {
    setMessages((messages) => [
      ...messages,
      { role, content: message, id: uuidv4() },
    ]);
  };

  const appendMessageToChat = (message: string) => {
    setMessages((messages) => {
      const latestMessage = messages[messages.length - 1];

      return [
        ...messages.slice(0, -1),
        { ...latestMessage, content: `${latestMessage.content}${message}` },
      ];
    });
  };

  const askKb: any = async (e: any, message: string) => {
    try {
      setLoading(true);
      setInput("");
      addMessageToChat(message || input);

      const payload = {
        vector_db_name: kbDetails?.vector_db,
        embed_model_name: kbDetails?.embed_model_name,
        query_str: message || input,
        user_id: session?.user?.details?.id,
        username: session?.user?.details?.name,
        collection_name: kbDetails?.name,
      };
      addMessageToChat("", "SimplAi");
      const KbPlaygroundResponse = await getKbPlaygroundResponseApi({
        payload,
      });
      if (KbPlaygroundResponse?.data?.nodes?.length > 0) {
        const response = KbPlaygroundResponse?.data?.nodes
          ?.map((node: any, index: number) => {
            const tableRow = `  \n### Result ${index + 1}  \n${node?.text || ""}  \n  \n`;
            return tableRow;
          })
          .join("");
        const newResponse = `## Found ${KbPlaygroundResponse?.data?.nodes?.length} matching responses  \n  \n${response}`;

        appendMessageToChat(newResponse);
      } else {
        appendMessageToChat("No relevant data available");
      }
    } catch (error) {
      appendMessageToChat(KB_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      closable={false}
      title={
        kbDetails?.name
          ? `${kbDetails?.name}'s playground`
          : "Knowledge base playground"
      }
      width={"60%"}
      onClose={onClose}
      afterOpenChange={() => {
        setMessages([]);
        setInput("");
        setLoading(false);
      }}
      open={open}
      extra={
        <Space>
          <Button
            type="text"
            danger
            onClick={closeDrawer}
            style={{ fontWeight: "bold" }}
          >
            Close
          </Button>
        </Space>
      }
    >
      <KbPlaygroundContainer>
        <Chat messages={messages} loading={loading} chatLoading={false} />
        <div style={{ padding: "0 12px" }}>
          <ChatInput
            submitHandler={askKb}
            handleInputChange={(e: any) => setInput(e?.target?.value || "")}
            input={input}
            setInput={setInput}
            loading={loading}
          />
        </div>
      </KbPlaygroundContainer>
    </Drawer>
  );
};

export default KnowledgebasePlaygroundDrawer;
